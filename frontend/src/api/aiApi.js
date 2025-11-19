import { apiRequest } from './client.js';

export const sendAiPrompt = (prompt, token, context) =>
  apiRequest('/ai/chat', {
    method: 'POST',
    body: { prompt, context },
    token,
  });
