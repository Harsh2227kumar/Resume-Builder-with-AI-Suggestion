import { check, validationResult } from 'express-validator';

/**
 * @file validation.js
 * @description Middleware to validate request data using express-validator.
 */

// Central function to process validation checks and handle errors
const validate = (req, res, next) => {
  // Only collect the first error for each field for cleaner output
  const errors = validationResult(req).formatWith(({ msg, param }) => ({
    field: param,
    message: msg
  }));

  if (errors.isEmpty()) {
    return next();
  }

  // Format and send validation errors
  res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: errors.array(),
  });
};

// --- Validation Schemas ---

// Validation for User Registration
export const validateRegistration = [
  check('name', 'Name is required').trim().notEmpty(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  validate, // Execute the validator function
];

// Validation for User Login
export const validateLogin = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists(),
  validate,
];

// Validation for AI Suggestions request
export const validateAISuggestions = [
    check('section', 'Section name (e.g., experience, summary) is required').notEmpty(),
    check('content', 'Content to be analyzed is required').notEmpty(),
    validate,
];