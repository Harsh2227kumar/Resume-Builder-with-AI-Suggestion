import asyncHandler from 'express-async-handler';
// FIX: Changed import path and name to the new Gemini service
import { getGeminiSuggestions } from '../services/geminiService.js'; 
import { generateExperiencePrompt, generateSummaryPrompt } from '../utils/prompts.js';

// Utility function to set status on error
const setStatusAndThrow = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    throw error;
};

/**
 * @file aiController.js
 * @description Controller logic for handling AI suggestion requests.
 */

// @route POST /api/ai/suggestions
// @access Private
const getSuggestions = asyncHandler(async (req, res) => {
  const { section, content } = req.body;

  if (!section || !content) { 
    setStatusAndThrow('Missing required fields: section and content.', 400);
  }

  let prompt;
  
  switch (section.toLowerCase()) {
    case 'experience':
      prompt = generateExperiencePrompt(content);
      break;
    case 'summary':
      prompt = generateSummaryPrompt(content);
      break;
    default:
      setStatusAndThrow(`Unsupported section for AI suggestion: ${section}`, 400);
  }

  // CHANGED: Call the new Gemini service function
  const suggestions = await getGeminiSuggestions(prompt);
  
  res.json({
    section,
    suggestions,
  });
});

export { getSuggestions };