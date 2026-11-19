import { faker } from "@faker-js/faker";
import { BookingData } from "../types";

export function mockBookingField(field: 'firstname'): string;
export function mockBookingField(field: 'lastname'): string;
export function mockBookingField(field: 'totalprice'): number;
export function mockBookingField(field: 'depositpaid'): boolean;
export function mockBookingField(
  field: 'bookingdates'
): BookingData['bookingdates'];
export function mockBookingField(field: 'additionalneeds'): string;

export function mockBookingField(field: keyof BookingData): BookingData[keyof BookingData];

export function mockBookingField(
  field: keyof BookingData
): BookingData[keyof BookingData] {
  switch (field) {
    case 'firstname':
      return faker.person.firstName();

    case 'lastname':
      return faker.person.lastName();

    case 'totalprice':
      return faker.number.int({ min: 1, max: 9999 });

    case 'depositpaid':
      return faker.datatype.boolean();

    case 'bookingdates':
      return createBookingDates();

    case 'additionalneeds':
      return faker.lorem.sentence();
  }
}

function createBookingDates(): BookingData['bookingdates'] {
  const checkin = faker.date.between({
    from: new Date('2018-01-01'),
    to: new Date('2030-12-31')
  });

  const checkout = new Date(checkin);
  checkout.setUTCDate(
    checkout.getUTCDate() + faker.number.int({ min: 1, max: 365 })
  );

  return {
    checkin: checkin.toISOString().slice(0, 10),
    checkout: checkout.toISOString().slice(0, 10)
  };
}