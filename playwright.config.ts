import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "https://www.saucedemo.com/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    // Project 1: Standard Login tests (clean state)
    {
      name: "auth-tests",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /login\.spec\.ts/,
    },
    // Project 2: All other tests using our custom fixture
    {
      name: "e2e-logged-in",
      use: {
        ...devices["Desktop Chrome"],
      },
      // Filters: run all specs except login
      testIgnore: [/login\.spec\.ts/],
    },
  ],
});
