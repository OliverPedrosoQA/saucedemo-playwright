import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import {
  SUCCESS_USERS,
  ERROR_SCENARIOS,
  UNAUTHORIZED_SCENARIOS,
} from "../test-data/users";

test.describe("Authentication - Success Flows", () => {
  for (const username of SUCCESS_USERS) {
    test(`Should allow login for: ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      await loginPage.login(username, "secret_sauce");
    });
  }

  test("Should logout successfully and redirect to login page", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory.html/);

    await loginPage.logout();

    await expect(page).toHaveURL("https://www.saucedemo.com/");

    await expect(loginPage.loginButton).toBeVisible();
  });
});

test.describe("Authentication - Error Scenarios", () => {
  for (const scenario of ERROR_SCENARIOS) {
    test(`Should show error for: ${scenario.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      await loginPage.login(scenario.user, scenario.pass);

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(scenario.error);
    });
  }
});

test.describe("Authentication - Unauthorized Access", () => {
  for (const scenario of UNAUTHORIZED_SCENARIOS) {
    test(`Should redirect to login with error when accessing ${scenario.path} unauthenticated`, async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);

      await page.goto(scenario.path);

      await expect(page).toHaveURL("https://www.saucedemo.com/");

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(scenario.error);
    });
  }
});
