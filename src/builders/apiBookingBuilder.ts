import { BookingData } from '../types';
import { mockBookingField } from '../test-data/mockBooking';
export class BookingBuilder {
  booking: BookingData;

  constructor() {
    this.booking = {
      firstname: mockBookingField('firstname'),
      lastname: mockBookingField('lastname'),
      totalprice: mockBookingField('totalprice'),
      depositpaid: mockBookingField('depositpaid'),
      bookingdates: mockBookingField('bookingdates')
    };
  }

  withAdditionalNeeds() {
    this.booking.additionalneeds = mockBookingField('additionalneeds');
    return this;
  }

  build(): BookingData {
    return { ...this.booking };
  }
}

export const createBookingData = (
  { withAdditionalNeeds = false }: { withAdditionalNeeds?: boolean } = {}
): BookingData => {
  const builder = new BookingBuilder();

  if (withAdditionalNeeds) {
    builder.withAdditionalNeeds();
  }

  return builder.build();
};