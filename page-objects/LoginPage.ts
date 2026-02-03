import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutMenuOption: Locator;

  static readonly ERRORS = {
    USER_REQUIRED: "Epic sadface: Username is required",
    LOCKED_OUT: "Epic sadface: Sorry, this user has been locked out.",
    WRONG_CREDENTIALS:
      "Epic sadface: Username and password do not match any user in this service",
  };

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.hamburgerMenu = page.getByRole("button", { name: "Open Menu" });
    this.logoutMenuOption = page.locator('[data-test="logout-sidebar-link"]');
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.hamburgerMenu.click();
    await this.logoutMenuOption.click();
  }

  async getErrorMessageText(): Promise<string> {
    return await this.errorMessage.innerText();
  }
}
