import asyncHandler from 'express-async-handler';
import Resume from '../models/Resume.js';

/**
 * @file resumeController.js
 * @description Controller logic for resume CRUD operations.
 */

// @route POST /api/resumes
// @access Private
const createResume = asyncHandler(async (req, res) => {
  const { title, personalInfo, summary, experience, education, skills, projects, template } = req.body;
  
  // Create a new resume linked to the authenticated user (req.user._id set by auth middleware)
  const resume = await Resume.create({
    userId: req.user._id,
    title,
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    template
  });

  res.status(201).json(resume);
});

// @route GET /api/resumes
// @access Private
const getUserResumes = asyncHandler(async (req, res) => {
  // Fetch all resumes belonging to the authenticated user
  const resumes = await Resume.find({ userId: req.user._id }).select('-__v');
  res.json(resumes);
});

// @route GET /api/resumes/:id
// @access Private
const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (resume && resume.userId.toString() === req.user._id.toString()) {
    res.json(resume);
  } else {
    res.status(404);
    throw new Error('Resume not found or user unauthorized');
  }
});

// @route PUT /api/resumes/:id
// @access Private
const updateResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (resume && resume.userId.toString() === req.user._id.toString()) {
    // Update all fields from req.body
    Object.assign(resume, req.body);
    
    const updatedResume = await resume.save();
    res.json(updatedResume);
  } else {
    res.status(404);
    throw new Error('Resume not found or user unauthorized for update');
  }
});

// @route DELETE /api/resumes/:id
// @access Private
const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (resume && resume.userId.toString() === req.user._id.toString()) {
    await Resume.deleteOne({ _id: req.params.id });
    res.json({ message: 'Resume removed successfully' });
  } else {
    res.status(404);
    throw new Error('Resume not found or user unauthorized for deletion');
  }
});

export {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};