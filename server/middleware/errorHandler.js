import config from '../config/config.js'; // FIX: Missing import

/**
 * @file errorHandler.js
 * @description Centralized error-handling middleware for Express.
 */
const errorHandler = (err, req, res, next) => {
  // Determine status code: set to 500 if an error with a 200 status somehow passed through
  const statusCode = err.statusCode === 200 ? 500 : err.statusCode || 500;
  
  // Set the status code before sending response
  res.status(statusCode);
  
  res.json({
    success: false,
    message: err.message,
    // Only send the stack trace in development environment for debugging
    stack: config.nodeEnv === 'development' ? err.stack : {},
  });
};

export default errorHandler;