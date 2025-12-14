import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';

/**
 * @file authRoutes.js
 * @description Defines the routes for user registration and login with validation.
 */
const router = express.Router();

// Apply validation middleware before hitting the controller
router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;