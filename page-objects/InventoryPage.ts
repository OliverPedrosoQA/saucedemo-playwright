import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductComponent } from "./components/ProductComponent";

export class InventoryPage extends BasePage {
  readonly inventoryList: Locator;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.productItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
  }

  getProduct(index: number) {
    return new ProductComponent(this.productItems.nth(index));
  }

  async goto() {
    await this.page.goto("/inventory.html");
  }

  async selectSortOption(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getAllPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allInnerTexts();
    return texts.map((t) => parseFloat(t.replace("$", "")));
  }

  async getAllNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  getLocators(productId?: string) {
    return new ProductComponent(this.page).getLocators(productId);
  }
}
