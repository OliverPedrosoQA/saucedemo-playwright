import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductComponent } from "./components/ProductComponent";

export class CheckoutStepTwoPage extends BasePage {
  readonly itemQuantity: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  getCheckoutItem(index: number) {
    return new ProductComponent(
      this.page.locator('[data-test="inventory-item"]').nth(index),
    );
  }
}
