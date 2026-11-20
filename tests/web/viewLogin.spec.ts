import { expect, test } from '../../src/fixtures/web/Pages';

test('Verify login visible', async ({ homePage }) => {
  await test.step('Login button is visible ', () => {
    expect(homePage.loginButton).toBeVisible();
  });

  await test.step('Click login button displays login modal', async () => {
    await homePage.clickLoginButton();
    const logingModalCount = await homePage.loginModal.count();
    expect(logingModalCount).toBe(1);
    await expect(homePage.modalHeader).toBeVisible();
  });

  await test.step('Google and email login options are visible', async () => {
    expect(homePage.modalGoogleLoginButton).toBeVisible();
    expect(homePage.modalEmailLoginButton).toBeVisible();
  });
});
