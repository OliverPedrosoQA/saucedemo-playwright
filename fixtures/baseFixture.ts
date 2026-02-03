import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";

type MyFixtures = {
  inventoryPageAuthenticated: Page;
};

export const test = base.extend<MyFixtures>({
  inventoryPageAuthenticated: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    await use(page);
  },
});

export { expect } from "@playwright/test";
