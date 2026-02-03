// 1. Import from your custom fixture
import { test, expect } from "../fixtures/baseFixture";
import { InventoryPage } from "../page-objects/InventoryPage";
import { ProductDetailPage } from "../page-objects/ProductDetailPage";
import { PRODUCTS } from "../test-data/products";

test.describe("Product Detail Page Validation", () => {
  // We use the authenticated fixture in the loop
  for (const product of PRODUCTS) {
    test(`should verify details for: ${product.name}`, async ({
      inventoryPageAuthenticated,
    }) => {
      const inventoryPage = new InventoryPage(inventoryPageAuthenticated);
      const detailPage = new ProductDetailPage(inventoryPageAuthenticated);

      // Act: Click the product name to navigate
      // Note: We don't need inventoryPage.goto() because the fixture already lands on the inventory page
      await inventoryPageAuthenticated
        .locator(
          `[data-test="inventory-item-name"]:has-text("${product.name}")`,
        )
        .click();

      // Assert
      await expect(inventoryPageAuthenticated).toHaveURL(
        new RegExp(`inventory-item.html\\?id=.*`),
      );

      const info = detailPage.getProductInfo().getLocators();

      await expect(info.name).toHaveText(product.name);
      await expect(info.desc).toHaveText(product.desc);
      await expect(info.price).toContainText(product.price);
      await expect(info.image).toBeVisible();

      // Verify "Back to products" works
      await detailPage.backToProductsBtn.click();
      await expect(inventoryPageAuthenticated).toHaveURL(/inventory.html/);
    });
  }
});
