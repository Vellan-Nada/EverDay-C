import { apiRequest } from './client.js';

export const createCheckoutSession = (mode = 'subscription', token, tier) =>
  apiRequest('/billing/checkout', {
    method: 'POST',
    body: { mode, tier },
    token,
  });

export const createBillingPortalSession = (token) =>
  apiRequest('/billing/portal', {
    method: 'POST',
    token,
  });
