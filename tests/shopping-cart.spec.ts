// 1. Import from your custom fixture
import { test, expect } from "../fixtures/baseFixture";
import { InventoryPage } from "../page-objects/InventoryPage";
import { CartPage } from "../page-objects/CartPage";
import { PRODUCTS } from "../test-data/products";

test.describe("Shopping Cart - Extended Scenarios", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  // 2. Use the fixture in beforeEach
  test.beforeEach(async ({ inventoryPageAuthenticated }) => {
    inventoryPage = new InventoryPage(inventoryPageAuthenticated);
    cartPage = new CartPage(inventoryPageAuthenticated);
    // Navigation to /inventory.html is already handled by the fixture
  });

  test("Should verify product details match between Inventory and Cart", async ({
    inventoryPageAuthenticated,
  }) => {
    const productsToTest = PRODUCTS.slice(0, 3);

    for (const product of productsToTest) {
      // Use the global getLocators fix to avoid container timeouts
      await inventoryPage.getLocators(product.id).addToCartBtn.click();
    }

    await inventoryPage.cartBadge.click();

    for (let i = 0; i < productsToTest.length; i++) {
      const cartItem = cartPage
        .getCartItem(i)
        .getLocators(productsToTest[i].id);

      await expect(cartItem.name).toHaveText(productsToTest[i].name);
      await expect(cartItem.desc).toHaveText(productsToTest[i].desc);
      await expect(cartItem.price).toContainText(productsToTest[i].price);
    }
  });

  test("Should remove products from Cart page and update badge", async ({
    inventoryPageAuthenticated,
  }) => {
    await inventoryPage.getLocators(PRODUCTS[0].id).addToCartBtn.click();
    await inventoryPage.getLocators(PRODUCTS[1].id).addToCartBtn.click();

    await expect(inventoryPage.cartBadge).toHaveText("2");
    await inventoryPage.cartBadge.click();

    // Remove first item (the second item then shifts to index 0)
    await cartPage
      .getCartItem(0)
      .getLocators(PRODUCTS[0].id)
      .removeFromCartBtn.click();
    await cartPage
      .getCartItem(0)
      .getLocators(PRODUCTS[1].id)
      .removeFromCartBtn.click();

    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test("Should persist cart items when using Continue Shopping", async ({
    inventoryPageAuthenticated,
  }) => {
    await inventoryPage.getLocators(PRODUCTS[0].id).addToCartBtn.click();
    await inventoryPage.cartBadge.click();

    await cartPage.continueShoppingBtn.click();
    await expect(inventoryPageAuthenticated).toHaveURL(/inventory.html/);

    await inventoryPage.getLocators(PRODUCTS[1].id).addToCartBtn.click();
    await inventoryPage.cartBadge.click();

    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.getCartItem(0).getLocators().name).toHaveText(
      PRODUCTS[0].name,
    );
    await expect(cartPage.getCartItem(1).getLocators().name).toHaveText(
      PRODUCTS[1].name,
    );
  });
});
