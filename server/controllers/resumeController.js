import asyncHandler from 'express-async-handler';
import Resume from '../models/Resume.js';

// Utility function to set status on error
const setStatusAndThrow = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    throw error;
};

/**
 * @file resumeController.js
 * @description Controller logic for resume CRUD operations.
 */

// @route POST /api/resumes
// @access Private
const createResume = asyncHandler(async (req, res) => {
  // Destructure allowed fields for whitelisting
  const { title, personalInfo, summary, experience, education, skills, projects, template } = req.body;
  
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

  if (!resume || resume.userId.toString() !== req.user._id.toString()) {
    setStatusAndThrow('Resume not found or user unauthorized', 404);
  }
  
  res.json(resume);
});

// @route PUT /api/resumes/:id
// @access Private
const updateResume = asyncHandler(async (req, res) => {
  const { title, personalInfo, summary, experience, education, skills, projects, template } = req.body;

  const updatedResume = await Resume.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id }, // Find by ID and ensure ownership
    {
      $set: {
        title,
        personalInfo,
        summary,
        experience,
        education,
        skills,
        projects,
        template,
      },
    },
    { new: true, runValidators: true } // Return the new document, run schema validators
  );

  if (!updatedResume) {
    setStatusAndThrow('Resume not found or user unauthorized for update', 404);
  }
  
  res.json(updatedResume);
});

// @route DELETE /api/resumes/:id
// @access Private
const deleteResume = asyncHandler(async (req, res) => {
  const result = await Resume.deleteOne({ _id: req.params.id, userId: req.user._id });

  if (result.deletedCount === 0) {
    setStatusAndThrow('Resume not found or user unauthorized for deletion', 404);
  }
  
  res.json({ message: 'Resume removed successfully' });
});

export {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};