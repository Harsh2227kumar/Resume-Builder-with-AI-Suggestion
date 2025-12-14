import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import config from '../config/config.js';

/**
 * @file auth.js
 * @description Middleware to protect routes using JSON Web Tokens (JWT).
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);

      // Attach user object to the request (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      // Throw error to be caught by express-async-handler and errorHandler
      // Set statusCode on error object for errorHandler
      error.statusCode = 401; 
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    // Throw error to be caught by express-async-handler and errorHandler
    const error = new Error('Not authorized, no token');
    error.statusCode = 401;
    throw error;
  }
});

export { protect };