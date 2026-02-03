import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly shoppingCartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }
}
