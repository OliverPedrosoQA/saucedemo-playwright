import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage {
  readonly successHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.successHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }
}
