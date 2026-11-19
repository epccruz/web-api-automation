import { test, expect } from '../../src/fixtures/api/manageBookingTestData';

test('Get a booking', async ({ bookingApi, setupBooking }) => {
  await test.step('Get an existing booking', async () => {
    console.info('setupBooking: ', setupBooking.bookingid)
    const getBooking = await bookingApi.get(setupBooking.bookingid);
    expect(getBooking.status()).toBe(200); 

    const getBookingResponse = await getBooking.json();
    expect(getBookingResponse).toMatchObject(setupBooking.booking);
  });

  await test.step('Get a non existing booking', async () => {
    await bookingApi.delete(setupBooking.bookingid);

    const getBooking = await bookingApi.get(setupBooking.bookingid);
    expect(getBooking.status()).toBe(404); 
  });
});