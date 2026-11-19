import { test, expect } from '../../src/fixtures/api/manageBookingTestData';
import { createBookingData } from '../../src/builders/apiBookingBuilder';
import { BookingData } from '../../src/types';

test('Update full booking data', 
  async ({ 
    bookingApi,
    setupBooking,
    cleanupBooking
  }) => {
    const updatedBookingInfo = createBookingData({
      withAdditionalNeeds: true
    });

    const updatedBooking = await bookingApi.put(
      setupBooking.bookingid,
      updatedBookingInfo
    );
    expect(updatedBooking.status()).toBe(200);

    const updatedBookingBody = await updatedBooking.json();
    expect(updatedBookingBody).toMatchObject(updatedBookingInfo);

    // Verify the updated field was saved
    const getBooking = await bookingApi.get(setupBooking.bookingid);
    const getBookingBody = await getBooking.json();

    expect(getBookingBody).toMatchObject(updatedBookingInfo);

    await cleanupBooking(setupBooking.bookingid);
});

test('Update full booking data with missing field', 
  async ({ 
    bookingApi,
    setupBooking,
    cleanupBooking
  }) => {
    const updatedBookingInfo: Partial<BookingData> = {
      ...createBookingData({ withAdditionalNeeds: true }),
    };
    delete updatedBookingInfo.totalprice;

    const updatedBooking = await bookingApi.put(
      setupBooking.bookingid,
      updatedBookingInfo as BookingData
    );
    expect(updatedBooking.status()).toBe(400);

    // Verify the field was not updated
    const getBooking = await bookingApi.get(setupBooking.bookingid);
    const getBookingBody = await getBooking.json();

    expect(getBookingBody).toMatchObject(setupBooking.booking);

    await cleanupBooking(setupBooking.bookingid);
});