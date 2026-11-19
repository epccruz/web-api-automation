import { test as base, expect } from '@playwright/test';

import type { APIResponse } from '@playwright/test';
import { BookingData } from '../../types';

const API_AUTH_CREDENTIALS = {
  // Move to .env
  "username" : "admin",
  "password" : "password123"
};

type Fixtures = {
  bookingApi: {
    create: (data: object) => Promise<APIResponse>;
    put: (bookingId: number, data: BookingData) => Promise<APIResponse>;
    patch: (bookingId: number, data: BookingData) => Promise<APIResponse>;
    get: (bookingId: number) => Promise<APIResponse>;
    delete: (bookingId: number) => Promise<APIResponse>;
  };
};

export const test = base.extend<Fixtures>({
  bookingApi: async ({ request }, use) => {
    const authHeaders = async () => {
      const response = await request.post('/auth', {
        data: API_AUTH_CREDENTIALS
      });

      const { token } = await response.json();

      return {
        Cookie: `token=${token}`
      };
    };

    await use({
      create: (data) =>
        request.post('/booking', { data }),
      put: async (bookingId, data) =>
        request.put(`/booking/${bookingId}`, {
          data,
          headers: await authHeaders()
        }),
      patch: async (bookingId, data) =>
        request.patch(`/booking/${bookingId}`, {
          data,
          headers: await authHeaders()
        }),
      get: (bookingId) =>
        request.get(`/booking/${bookingId}`),
      delete: async (bookingId) =>
        request.delete(`/booking/${bookingId}`, {
          headers: await authHeaders()
        })
    });
  }
});

export { expect };