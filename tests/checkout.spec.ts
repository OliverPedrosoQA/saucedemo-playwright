import { test, expect } from "../fixtures/baseFixture";
import { InventoryPage } from "../page-objects/InventoryPage";
import { CheckoutStepOnePage } from "../page-objects/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../page-objects/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../page-objects/CheckoutCompletePage";
import { PRODUCTS } from "../test-data/products";

test.describe("Checkout Process", () => {
  let inventoryPage: InventoryPage;
  let stepOne: CheckoutStepOnePage;
  let stepTwo: CheckoutStepTwoPage;

  test.beforeEach(async ({ inventoryPageAuthenticated }) => {
    inventoryPage = new InventoryPage(inventoryPageAuthenticated);
    stepOne = new CheckoutStepOnePage(inventoryPageAuthenticated);
    stepTwo = new CheckoutStepTwoPage(inventoryPageAuthenticated);
  });

  test("Should show error when first name is missing", async ({
    inventoryPageAuthenticated,
  }) => {
    await inventoryPage.getLocators("sauce-labs-backpack").addToCartBtn.click();

    await inventoryPage.cartBadge.click();
    await inventoryPageAuthenticated.locator('[data-test="checkout"]').click();

    await stepOne.fillInformation("", "Doe", "12345");
    await expect(stepOne.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });

  test("Should verify mathematical totals in Step Two", async ({
    inventoryPageAuthenticated,
  }) => {
    await inventoryPage.getLocators("sauce-labs-backpack").addToCartBtn.click();

    await inventoryPage.cartBadge.click();
    await inventoryPageAuthenticated.locator('[data-test="checkout"]').click();

    await stepOne.fillInformation("John", "Doe", "12345");

    const subtotalText = await stepTwo.itemTotalLabel.innerText();
    const subtotalValue = parseFloat(subtotalText.split("$")[1]);

    const expectedTax = parseFloat((subtotalValue * 0.08).toFixed(2));
    const actualTaxText = await stepTwo.taxLabel.innerText();
    const actualTax = parseFloat(actualTaxText.split("$")[1]);

    expect(actualTax).toBe(expectedTax);

    const totalText = await stepTwo.totalLabel.innerText();
    const actualTotal = parseFloat(totalText.split("$")[1]);
    expect(actualTotal).toBe(subtotalValue + actualTax);

    await stepTwo.finishButton.click();

    const completePage = new CheckoutCompletePage(inventoryPageAuthenticated);
    await expect(completePage.successHeader).toHaveText(
      "Thank you for your order!",
    );
  });

  test("Should verify mathematical totals with three products", async ({
    inventoryPageAuthenticated,
  }) => {
    const selectedProducts = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]];
    let expectedSubtotal = 0;

    for (const product of selectedProducts) {
      await inventoryPage.getLocators(product.id).addToCartBtn.click();
      expectedSubtotal += parseFloat(product.price);
    }

    await inventoryPage.cartBadge.click();
    await inventoryPageAuthenticated.locator('[data-test="checkout"]').click();
    await stepOne.fillInformation("Jane", "Doe", "90210");

    const subtotalText = await stepTwo.itemTotalLabel.innerText();
    const actualSubtotal = parseFloat(subtotalText.split("$")[1]);
    expect(actualSubtotal).toBe(expectedSubtotal);

    const expectedTax = parseFloat((expectedSubtotal * 0.08).toFixed(2));
    const actualTaxText = await stepTwo.taxLabel.innerText();
    const actualTax = parseFloat(actualTaxText.split("$")[1]);
    expect(actualTax).toBe(expectedTax);

    const totalText = await stepTwo.totalLabel.innerText();
    const actualTotal = parseFloat(totalText.split("$")[1]);
    expect(actualTotal).toBe(
      parseFloat((expectedSubtotal + expectedTax).toFixed(2)),
    );
  });

  test("Should cancel checkout at Step Two and retain cart items", async ({
    inventoryPageAuthenticated,
  }) => {
    await inventoryPage.getLocators(PRODUCTS[0].id).addToCartBtn.click();
    await inventoryPage.getLocators(PRODUCTS[1].id).addToCartBtn.click();

    await inventoryPage.cartBadge.click();
    await inventoryPageAuthenticated.locator('[data-test="checkout"]').click();
    await stepOne.fillInformation("Jane", "Doe", "90210");

    await expect(inventoryPageAuthenticated).toHaveURL(
      /checkout-step-two.html/,
    );

    await stepTwo.cancelButton.click();

    await expect(inventoryPageAuthenticated).toHaveURL(/inventory.html/);
    await expect(inventoryPage.cartBadge).toHaveText("2");
  });
});
