import { Page, Locator } from '@playwright/test';
import { WEBSITE_URL } from '../../utils/constants';

export class HomePage {
  page: Page;
  logoLink: Locator;
  logoSvg: Locator;
  loginButton: Locator;
  loginModal: Locator;
  modalHeader: Locator;
  modalGoogleLoginButton: Locator;
  modalEmailLoginButton: Locator;
  originInput: Locator;
  destinationInput: Locator;
  searchButton: Locator;
  removeOriginButton: Locator;
  defaultOrigin: (origin: string) => Locator;
  locateSearchOption: (name: string) => Promise<Locator>;

  constructor (page: Page) {
    this.page = page;

    this.logoLink = page.getByRole('link', {name: 'Go to the cheapflights homepage' });
    this.logoSvg = this.logoLink.locator('svg');

    this.loginButton = page.getByRole('button', { name: 'Sign in' });
    this.loginModal = page.getByRole('dialog', { name: /sign in or create an account/i });
    this.modalHeader = this.loginModal.getByText(/Welcome to cheapflights/i);

    // Apple login not supported in chromium browser
    this.modalGoogleLoginButton = this.loginModal.getByRole('button', { name: /google/i });
    this.modalEmailLoginButton = this.loginModal.getByRole('button', { name: /continue with email/i });

    this.originInput = page.getByRole('combobox', { name: 'Origin location' });
    this.destinationInput = page.getByRole('combobox', { name: 'Ask anything' });
    this.searchButton = page.getByRole('button', { name: 'Search'});

    this.defaultOrigin = (origin) => page.getByRole('option', { name: new RegExp(origin, 'i') });
    this.removeOriginButton = page.getByRole('button', {name: /remove value/i });
    this.locateSearchOption = async (name) => await page.getByRole('option', { name });
  }

  async clickDateButton (date: string) {
    await this.page.getByRole('button', { name: new RegExp(date, 'i') }).click();
  };

  async clickLogoLink () {
    await this.logoLink.click();
  }

  async clickLoginButton () {
    await this.loginButton.click();
  }

  async typeOrigin (origin: string) {
    await this.originInput.pressSequentially(origin);
  }

  async typeDestination (destination: string) {
    await this.destinationInput.pressSequentially(destination);
  }

  async clickSearch () {
    await this.searchButton.click();
  }

  async goto () {
    await this.page.goto(WEBSITE_URL);
  }
}
