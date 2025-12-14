import jwt from 'jsonwebtoken';
import config from '../config/config.js';

/**
 * @file helper.js
 * @description Utility functions, including JWT generation.
 */

/**
 * Generates a JSON Web Token for user authentication.
 * @param {string} id - The MongoDB ObjectId of the user.
 * @returns {string} The signed JWT.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '30d', // Token expiration time
  });
};

export { generateToken };