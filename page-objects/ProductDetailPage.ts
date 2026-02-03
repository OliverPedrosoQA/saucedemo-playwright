import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductComponent } from "./components/ProductComponent";

export class ProductDetailPage extends BasePage {
  readonly backToProductsBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.backToProductsBtn = page.locator('[data-test="back-to-products"]');
  }

  getProductInfo() {
    return new ProductComponent(this.page);
  }
}
