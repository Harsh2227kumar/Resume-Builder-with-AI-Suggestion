import { check, validationResult } from 'express-validator';

/**
 * @file validation.js
 * @description Middleware to validate request data using express-validator.
 */

// Central function to process validation checks and handle errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Format and send validation errors
  const extractedErrors = errors.array().map(err => ({
    [err.param]: err.msg,
  }));

  res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: extractedErrors,
  });
};

// --- Validation Schemas ---

// Validation for User Registration
export const validateRegistration = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  validate, // Execute the validator function
];

// Validation for User Login
export const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  validate,
];

// Validation for AI Suggestions request
export const validateAISuggestions = [
    check('section', 'Section name (e.g., experience, summary) is required').notEmpty(),
    check('content', 'Content to be analyzed is required').notEmpty(),
    validate,
];