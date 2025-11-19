import { apiRequest } from './client.js';

export const submitFeedback = (message, token) =>
  apiRequest('/feedback', { method: 'POST', body: { message }, token });
