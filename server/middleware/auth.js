import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; // Used for simplified async error handling
import User from '../models/User.js';
import config from '../config/config.js';

/**
 * @file auth.js
 * @description Middleware to protect routes using JSON Web Tokens (JWT).
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for 'Bearer' token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token (remove 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);

      // Attach user object to the request (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };