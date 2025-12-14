/**
 * @file constants.js
 * @description Central storage for application constants.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const FORM_STEPS = [
  'Personal Info',
  'Education',
  'Experience',
  'Skills',
  'Projects',
  'Summary',
];

export const TEMPLATE_OPTIONS = {
  CLASSIC: 'Classic',
  MODERN: 'Modern',
  MINIMAL: 'Minimal',
};

// Initial state structure for a new resume (Matches server/models/Resume.js)
export const INITIAL_RESUME_DATA = {
  _id: null,
  title: 'My Professional Resume',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  template: TEMPLATE_OPTIONS.CLASSIC,
};