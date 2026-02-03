import { Locator, Page } from "@playwright/test";

export class ProductComponent {
  constructor(private readonly root: Locator | Page) {}

  getLocators(productId?: string) {
    return {
      name: this.root.locator('[data-test="inventory-item-name"]'),
      desc: this.root.locator('[data-test="inventory-item-desc"]'),
      price: this.root.locator('[data-test="inventory-item-price"]'),
      image: productId
        ? this.root.locator(`[data-test="inventory-item-${productId}-img"]`)
        : this.root.locator(".inventory_details_img"),

      addToCartBtn: productId
        ? this.root.locator(`[data-test="add-to-cart-${productId}"]`)
        : this.root.locator('[data-test^="add-to-cart"]'),

      removeFromCartBtn: productId
        ? this.root.locator(`[data-test="remove-${productId}"]`)
        : this.root.locator('[data-test^="remove"]'),
    };
  }
}
