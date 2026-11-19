import { test, expect } from '../../src/fixtures/api/manageBookingTestData';
import { BookingData } from '../../src/types';
import { mockBookingField } from '../../src/test-data/mockBooking';

const bookingFields: (keyof BookingData)[] = [
  'firstname',
  'lastname',
  'totalprice',
  'depositpaid',
  'bookingdates',
  'additionalneeds'
];

for (const bookingField of bookingFields) {
  test(`Partial update booking specific field = ${bookingField}`, 
    async ({ 
      bookingApi,
      setupBooking,
      cleanupBooking
    }) => {
      const updatedBookingInfo = {
        ...setupBooking.booking,
        [bookingField]: mockBookingField(bookingField)
      };

      const updatedBooking = await bookingApi.patch(
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
}