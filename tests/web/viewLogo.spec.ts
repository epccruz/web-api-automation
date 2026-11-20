import { expect, test } from '../../src/fixtures/web/Pages';
import { WEBSITE_URL } from '../../src/utils/constants';

test('Verify logo is visible', async ({ homePage }) => {
  await test.step('Logo link is visible', () => {
    expect(homePage.logoLink).toBeVisible();
    expect(homePage.logoLink).toHaveAttribute('href', '/');
  });

  await test.step('Logo svg is visible', () => {
    expect(homePage.logoLink).toBeVisible();
  });

  await test.step('Click logo redirects to home page', async () => {
    await homePage.clickLogoLink();
    expect(homePage.page).toHaveURL(WEBSITE_URL);
  })
});
