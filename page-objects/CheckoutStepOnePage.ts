import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepOnePage extends BasePage {
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCodeField: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.postalCodeField = page.locator('[data-test="postalCode"]');
  }

  async fillInformation(first: string, last: string, zip: string) {
    await this.firstNameField.fill(first);
    await this.lastNameField.fill(last);
    await this.postalCodeField.fill(zip);
    await this.continueButton.click();
  }
}
