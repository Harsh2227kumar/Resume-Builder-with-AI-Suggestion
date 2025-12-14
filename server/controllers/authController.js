import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { generateToken } from '../utils/helper.js';

/**
 * @file authController.js
 * @description Controller logic for user registration and authentication.
 */

// Utility function to set status on error
const setStatusAndThrow = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    throw error;
};

// @route POST /api/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    setStatusAndThrow('User already exists', 400); // FIX: Removed redundant res.status(400)
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // This case should be rare if validation passed, but kept for robustness
    setStatusAndThrow('Invalid user data', 400); 
  }
});

// @route POST /api/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // Use 401 for login failure for security (don't distinguish between email/password error)
    setStatusAndThrow('Invalid email or password', 401); 
  }
});

export { registerUser, loginUser };