import { apiRequest } from './client.js';

export const getProfile = (token) => apiRequest('/auth/profile', { token });

export const updateProfile = (payload, token) =>
  apiRequest('/auth/profile', { method: 'PUT', body: payload, token });

export const getPlanStatus = (token) => apiRequest('/auth/plan', { token });

export const deleteAccount = (token) => apiRequest('/auth/account', { method: 'DELETE', token });
