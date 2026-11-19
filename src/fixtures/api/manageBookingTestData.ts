import { test as bookingApi, expect } from './bookingApiRequests';
import { createBookingData } from '../../builders/apiBookingBuilder';
import { BookingData } from '../../types';

type Fixtures = {
  setupBooking: {
    booking: BookingData;
    bookingid: number;
  };
  cleanupBooking: (bookingid: number) => void;
};

export const test = bookingApi.extend<Fixtures>({
  setupBooking: async ({ bookingApi }, use) => {
    const response = await bookingApi.create(
      createBookingData({ withAdditionalNeeds: true })
    );

    const { booking, bookingid } = await response.json();

    await use({ booking, bookingid });
  },

  cleanupBooking: async ({ bookingApi }, use) => {
    let bookingId: number | undefined;

    await use((id) => {
      bookingId = id;
    });

    if (bookingId) {
      await bookingApi.delete(bookingId);
    }
  }
});

export { expect }