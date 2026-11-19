import { test, expect } from '@playwright/test';
import { createBookingData } from '../../src/builders/apiBookingBuilder';
import { BookingData } from '../../src/types';

for (const withAdditionalNeeds of [true, false]) {
  test(`Create booking with additiona needs = ${withAdditionalNeeds}`, async ({ request }) => {
    const bookingInfo = createBookingData({ withAdditionalNeeds });

    const newBooking = await request.post('/booking', { data: bookingInfo });
    expect(newBooking.status()).toBe(200);

    const { booking, bookingid } = await newBooking.json();

    expect(bookingid).toBeDefined();
    expect(booking).toMatchObject(bookingInfo);

    if (!withAdditionalNeeds) {
      expect(booking).not.toHaveProperty('additionalneeds');
    }

    // Use GET booking API to verify created booking was saved
    const getBooking = await request.get(`/booking/${bookingid}`);
    expect(newBooking.status()).toBe(200);

    const getBookingResponse = await getBooking.json();
    expect(getBookingResponse).toMatchObject(bookingInfo);
  });
}

test('Create Booking with missing required info', async ({ request }) => {
  const bookingInfo: Partial<BookingData> = createBookingData();
  delete bookingInfo.firstname;

  const newBooking = await request.post(`/booking`, { data: bookingInfo });
  expect(newBooking.ok()).not.toBeTruthy();
  expect(newBooking.status()).toBe(500);
});
