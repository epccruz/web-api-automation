import { test, expect } from '../../src/fixtures/api/bookingApi';
import { createBookingData } from '../../src/builders/apiBookingBuilder';
import { BookingData } from '../../src/types';

const requiredFields: (keyof BookingData)[] = [
  'firstname',
  'lastname',
  'totalprice',
  'depositpaid',
  'bookingdates'
];

for (const withAdditionalNeeds of [true, false]) {
  test(`Create booking with additiona needs = ${withAdditionalNeeds}`, async ({ bookingApi }) => {
    const bookingInfo = createBookingData({ withAdditionalNeeds });

    const newBooking = await bookingApi.create(bookingInfo);
    expect(newBooking.status()).toBe(200);

    const { booking, bookingid } = await newBooking.json();

    expect(bookingid).toBeDefined();
    expect(booking).toMatchObject(bookingInfo);

    if (!withAdditionalNeeds) {
      expect(booking).not.toHaveProperty('additionalneeds');
    }

    // Use GET booking API to verify created booking was saved
    const getBooking = await bookingApi.get(bookingid);
    expect(newBooking.status()).toBe(200);

    const getBookingResponse = await getBooking.json();
    expect(getBookingResponse).toMatchObject(bookingInfo);
  });
}

for (const requiredField of requiredFields) {
  test(`Create booking with missing required field: ${String(requiredField)}`, async ({ bookingApi }) => {
    const bookingInfo: Partial<BookingData> = createBookingData();
    delete bookingInfo[requiredField];

    const response = await bookingApi.create(bookingInfo);

    expect(response.status()).toBe(500);
  });
}