import { faker } from '@faker-js/faker';
import { BookingData } from '../types';

export class BookingBuilder {
  private booking: BookingData;

  constructor() {
    const checkinDate = faker.date.between({
      from: '2018-01-01',
      to: '2030-12-31'
    });

    const additionalDays = faker.number.int({
      min: 1,
      max: 365
    });

    const checkoutDate = new Date(checkinDate);
    checkoutDate.setUTCDate(
      checkoutDate.getUTCDate() + additionalDays
    );

    this.booking = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({
        min: 1,
        max: 9999
      }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: checkinDate.toISOString().slice(0, 10),
        checkout: checkoutDate.toISOString().slice(0, 10)
      },
    };
  }

  withAdditionalNeeds() {
    this.booking.additionalneeds = faker.lorem.sentence();
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