import express from 'express';
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';

/**
 * @file resumeRoutes.js
 * @description Defines the protected routes for resume CRUD operations.
 */
const router = express.Router();

// All these routes are protected (require JWT)
router.route('/')
  .post(protect, createResume)
  .get(protect, getUserResumes);

router.route('/:id')
  .get(protect, getResumeById)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

export default router;