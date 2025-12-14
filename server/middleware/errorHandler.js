import config from '../config/config.js';

/**
 * @file errorHandler.js
 * @description Centralized error-handling middleware for Express.
 */
const errorHandler = (err, req, res, next) => {
  // Determine status code: use the error's status or default to 500
  const statusCode = err.statusCode === 200 ? 500 : err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    // Only send the stack trace in development environment for debugging
    stack: config.nodeEnv === 'development' ? err.stack : {},
  });
};

export default errorHandler;