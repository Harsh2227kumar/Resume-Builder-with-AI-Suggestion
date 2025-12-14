import express from 'express';
import { getSuggestions } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';
import { validateAISuggestions } from '../middleware/validation.js';

/**
 * @file aiRoutes.js
 * @description Defines the route for fetching AI suggestions with validation.
 */
const router = express.Router();

router.post('/suggestions', protect, validateAISuggestions, getSuggestions);

export default router;