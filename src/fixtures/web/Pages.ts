import { test as base, expect } from '@playwright/test';
import { HomePage } from "./HomePage";

type Pages = {
  homePage: HomePage
}

export const test = base.extend<Pages> ({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    return use(homePage);
  }
});

export { expect };
