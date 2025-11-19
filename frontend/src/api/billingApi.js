import { apiRequest } from './client.js';

export const createCheckoutSession = (mode = 'subscription', token) =>
  apiRequest('/billing/checkout', {
    method: 'POST',
    body: { mode },
    token,
  });

export const createBillingPortalSession = (token) =>
  apiRequest('/billing/portal', {
    method: 'POST',
    token,
  });
