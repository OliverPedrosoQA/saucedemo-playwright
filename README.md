SauceDemo Playwright Automation Framework
=========================================

This repository contains a professional end-to-end testing suite for [SauceDemo](https://www.saucedemo.com/), utilizing **Playwright**, **TypeScript**, and a robust **Page Object Model (POM)** architecture.

🏗️ Architecture Overview
-------------------------

This framework has been transitioned from a file-based storage state (auth.setup.ts) to a more modern **Custom Fixture** approach.

*   **Custom Fixtures**: The inventoryPageAuthenticated fixture handles login logic via code, providing a ready-to-use authenticated page object for functional tests.
    
*   **POM Inheritance**: All page objects (Inventory, Cart, Product Details) extend a BasePage class to share common locators like the shopping cart badge and page titles.
    
*   **Component-Based Design**: Individual product cards are managed via a ProductComponent to ensure locators remain DRY (Don't Repeat Yourself).
    

🛠️ Setup & Installation
------------------------

### 1\. Clone and Install

\# Install dependencies_npm install_\# Install Playwright browsers_npx playwright install_

### 2\. Cleanup (Migration from Storage State)

If you previously used auth.setup.ts, ensure the following are removed to avoid configuration clashes:

*   Delete tests/auth.setup.ts.
    
*   Delete the playwright-auth/ folder.
    
*   Ensure playwright.config.ts has no dependencies or storageState properties.
    

🧪 Running Tests
----------------

The suite is organized into distinct **Projects** within the Playwright config for better isolation.

Run All Tests

--> _npx playwright test_

**Authentication & Security Tests** (Login, Error states, Unauthorized access):

--> _npx playwright test --project=auth-tests_

**Functional E2E Tests** (Inventory, Shopping Cart, Checkout):

--> _npx playwright test --project=e2e-logged-in_

Project Debugging with UI Mode

--> _npx playwright test --ui_

📊 Reporting
------------

After execution, you can view the detailed HTML report, which includes traces and screenshots of any failures:

--> _npx playwright show-report_

📁 Project Structure
------------
<img width="551" height="584" alt="project-strucutre" src="https://github.com/user-attachments/assets/0da187d4-7536-47f8-a668-2155b271b297" />

🏗️ Core Design Principles
--------------------------

### 1\. Custom Test Fixtures (Dependency Injection)

*   **Authenticated State**: Uses a custom inventoryPageAuthenticated fixture to handle the login process once per worker, injecting a ready-to-use page object into functional tests.
    
*   **Session Management**: Eliminates the need for manual storageState JSON files, reducing disk I/O and potential security risks from committing session data.
    
*   **Modular Architecture**: Separates authentication logic from functional test logic, allowing the login.spec.ts to remain independent for security testing.
    

### 2\. Advanced Page Object Model (POM)

*   **Class Inheritance**: Implements a BasePage that serves as a parent to all specific page objects (Inventory, Cart, Checkout, etc.).
    
*   **Shared Locators**: Global elements like the Shopping Cart Badge, Side Menu, and Page Titles are defined once in the BasePage and inherited by children.
    
*   **Encapsulation**: UI actions (like selectSortOption or fillInformation) are abstracted into methods, ensuring specs only contain test logic, not raw locators.
    

### 3\. Component-Based Architecture

*   **Granular Control**: Uses a dedicated ProductComponent to manage individual product cards.
    
*   **Dynamic Scoping**: The component can be scoped to a specific card (using .nth()) for catalog validation or used globally for direct actions via unique IDs.
    
*   **Reusability**: The same component logic is used across the Inventory page, the Cart page, and the Product Detail page.
    

### 4\. Robust Locator Strategy

*   **Test ID Reliance**: Exclusively uses data-test attributes to create resilient selectors that are less likely to break during UI styling updates.
    
*   **Scoped vs. Global Locators**: Implements a hybrid approach—scoping for index-based list validation and global searching for direct "Add to Cart" actions to prevent timeout issues in parallel execution.
    

### 5\. Data-Driven Testing (DDT)

*   **Externalized Constants**: All product details (names, descriptions, prices) and user credentials are stored in test-data/, allowing for easy maintenance.
    
*   **Dynamic Test Generation**: Uses TypeScript for...of loops to dynamically generate test cases for every product in the catalog, ensuring 100% catalog coverage with minimal code.



📁 Project Structure
--------------------
