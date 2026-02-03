import { test, expect } from "../fixtures/baseFixture";
import { InventoryPage } from "../page-objects/InventoryPage";
import { ProductComponent } from "../page-objects/components/ProductComponent";
import { PRODUCTS } from "../test-data/products";

test.describe("Product Catalog - Inventory List", () => {
  test("should display 6 product cards", async ({
    inventoryPageAuthenticated,
  }) => {
    const inventoryPage = new InventoryPage(inventoryPageAuthenticated);
    await expect(inventoryPage.productItems).toHaveCount(6);
  });

  for (let i = 0; i < PRODUCTS.length; i++) {
    const productData = PRODUCTS[i];

    test(`should verify product card: ${productData.name}`, async ({
      inventoryPageAuthenticated,
    }) => {
      const inventoryPage = new InventoryPage(inventoryPageAuthenticated);

      const productComp = inventoryPage.getProduct(i);
      const card = productComp.getLocators(productData.id);

      await expect(card.name).toHaveText(productData.name);
      await expect(card.desc).toHaveText(productData.desc);
      await expect(card.price).toContainText(productData.price);
      await expect(card.image).toBeVisible();
      await expect(card.addToCartBtn).toBeVisible();
      await expect(card.addToCartBtn).toHaveText("Add to cart");
    });
  }

  test("should navigate to product detail page and show correct data", async ({
    inventoryPageAuthenticated,
  }) => {
    const inventoryPage = new InventoryPage(inventoryPageAuthenticated);
    const firstProduct = PRODUCTS[0];

    const firstCard = inventoryPage.getProduct(0).getLocators(firstProduct.id);
    await firstCard.name.click();

    await expect(inventoryPageAuthenticated).toHaveURL(/inventory-item.html/);

    const detailPageComp = new ProductComponent(inventoryPageAuthenticated);
    const detailPage = detailPageComp.getLocators();

    await expect(detailPage.name).toHaveText(firstProduct.name);
    await expect(detailPage.desc).toHaveText(firstProduct.desc);
    await expect(detailPage.price).toContainText(firstProduct.price);
  });

  test.describe("Product Catalog - Sorting Validation", () => {
    test("should sort products from High to Low price", async ({
      inventoryPageAuthenticated,
    }) => {
      const inventoryPage = new InventoryPage(inventoryPageAuthenticated);
      await inventoryPage.selectSortOption("hilo");

      const prices = await inventoryPage.getAllPrices();
      const sortedPrices = [...prices].sort((a, b) => b - a);

      expect(prices).toEqual(sortedPrices);
    });

    test("should sort products from Low to High price", async ({
      inventoryPageAuthenticated,
    }) => {
      const inventoryPage = new InventoryPage(inventoryPageAuthenticated);
      await inventoryPage.selectSortOption("lohi");

      const prices = await inventoryPage.getAllPrices();
      const sortedPrices = [...prices].sort((a, b) => a - b);

      expect(prices).toEqual(sortedPrices);
    });

    test("should sort products from A to Z", async ({
      inventoryPageAuthenticated,
    }) => {
      const inventoryPage = new InventoryPage(inventoryPageAuthenticated);
      await inventoryPage.selectSortOption("az");

      const names = await inventoryPage.getAllNames();
      const sortedNames = [...names].sort();

      expect(names).toEqual(sortedNames);
    });

    test("should sort products from Z to A", async ({
      inventoryPageAuthenticated,
    }) => {
      const inventoryPage = new InventoryPage(inventoryPageAuthenticated);
      await inventoryPage.selectSortOption("za");

      const names = await inventoryPage.getAllNames();
      const sortedNames = [...names].sort().reverse();

      expect(names).toEqual(sortedNames);
    });
  });
});
