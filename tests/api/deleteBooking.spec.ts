import { test, expect } from '../../src/fixtures/api/manageBookingTestData';

test('Delete booking', async ({ bookingApi, setupBooking }) => {
  await test.step('Delete an existing booking', async () => {
    const deletedBooking = await bookingApi.delete(setupBooking.bookingid);
    expect(deletedBooking.status()).toBe(201);

    // Use GET booking API to verify deleted booking is not found
    const getBooking = await bookingApi.get(setupBooking.bookingid);
    expect(getBooking.status()).toBe(404); 
  });

  await test.step('Delete a non existing booking', async () => {
    // Delete the same booking id that was already deleted
    const deletedBooking =
      await bookingApi.delete(setupBooking.bookingid);

    expect(deletedBooking.status()).toBe(405);
  });
});