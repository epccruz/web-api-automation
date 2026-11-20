import { expect, test } from '../../src/fixtures/web/Pages';

// To do: Clean up test data generation

test('Search return flights', async ({ homePage, context }) => {
    await test.step('Input Origin', async () => {
    const defaultOrigin = homePage.defaultOrigin('MNL');
    if(defaultOrigin) await homePage.removeOriginButton.click();

    await homePage.typeOrigin('Manila');
    const firstOption = await homePage.locateSearchOption('Manila, Philippines');
    await expect(firstOption).toBeVisible();
    await firstOption.click();
  });

  await test.step('Input Destination', async () => {
    await homePage.typeDestination('Hong');
    const firstOption = await homePage.locateSearchOption('Hong Kong, Hong Kong');
    await expect(firstOption).toBeVisible();
    await firstOption.click();
  });

  await test.step('Input Booking Dates', async () => {
    await homePage.clickDateButton('21 December');
    await homePage.clickDateButton('27 December');
  });

  await test.step('Search button opens up results', async () => {
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      homePage.clickSearch(),
    ]);

    await newTab.waitForLoadState();

    // To do: Move to POM

    // Assert the new tab opened 
    expect(context.pages()).toHaveLength(2);
    await expect(newTab).not.toHaveURL('about:blank');
    await expect(newTab).toHaveURL(/\/flight-search\/MNL-HKG\/2026-12-21\/2026-12-27(\?.*)?$/);

    // Assert origin & destination
    const outboundLeg = newTab.getByRole('checkbox', {
      name: /Leg 1:.*MNL\s+\d{2}:\d{2}\s+-\s+HKG\s+\d{2}:\d{2}/i,
    }).first();

    await expect(outboundLeg).toBeVisible();

    // Assert a positive price is displayed
    const price = newTab.getByText(/^\$\d[\d,.]*$/, { exact: true }).first();
    await expect(price).toBeVisible();

    const priceText = await price.textContent();
    const numericPrice = Number(priceText?.replace(/[$,.]/g, ''));

    expect(numericPrice).toBeGreaterThan(0);
  });
});
