import { test as base, expect } from '@playwright/test';

import type { APIResponse } from '@playwright/test';
import { BookingData } from '../../types';

type Fixtures = {
  bookingApi: {
    create: (data: object) => Promise<APIResponse>;
    update: (bookingId: number, data: BookingData) => Promise<APIResponse>;
    get: (bookingId: number) => Promise<APIResponse>;
    delete: (bookingId: number) => Promise<APIResponse>;
  };
};

export const test = base.extend<Fixtures>({
  bookingApi: async ({ request }, use) => {
    await use({
      create: (data) =>
        request.post('/booking', { data }),
      update: (bookingId, data) =>
        request.get(`/booking/${bookingId}`, { data }),
      get: (bookingId) =>
        request.get(`/booking/${bookingId}`),
      delete: (bookingId) =>
        request.delete(`/booking/${bookingId}`)
    });
  }
});

export { expect };