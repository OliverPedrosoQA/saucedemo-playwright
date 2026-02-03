import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductComponent } from "./components/ProductComponent";

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly continueShoppingBtn: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async goto() {
    await this.page.goto("/cart.html");
  }

  getCartItem(index: number) {
    return new ProductComponent(this.cartItems.nth(index));
  }
}
