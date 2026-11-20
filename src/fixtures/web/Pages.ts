import { test as base, expect } from '@playwright/test';
import { HomePage } from "./HomePage";

type Pages = {
  homePage: HomePage
}

export const test = base.extend<Pages> ({
  homePage: ({ page }, use) => {
    return use(new HomePage(page));
  }
});

export { expect };
