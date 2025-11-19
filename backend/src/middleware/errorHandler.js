import { logger } from '../config/logger.js';

export const notFoundHandler = (req, res, next) => {
  res.status(404);
  res.json({ error: 'Route not found' });
};

export const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled error', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
};
