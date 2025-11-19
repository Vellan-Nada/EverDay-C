import { apiRequest } from './client.js';

export const fetchFeatures = () => apiRequest('/features');
export const fetchFeatureDetail = (featureKey) => apiRequest(`/features/${featureKey}`);
