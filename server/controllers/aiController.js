import asyncHandler from 'express-async-handler';
import { getAISuggestions } from '../services/openaiServices.js';
import { generateExperiencePrompt, generateSummaryPrompt } from '../utils/prompts.js';

/**
 * @file aiController.js
 * @description Controller logic for handling AI suggestion requests.
 */

// @route POST /api/ai/suggestions
// @access Private
const getSuggestions = asyncHandler(async (req, res) => {
  const { section, content } = req.body;

  if (!section || !content) {
    res.status(400);
    throw new Error('Missing required fields: section and content.');
  }

  let prompt;
  
  // Select the appropriate prompt template based on the section
  switch (section.toLowerCase()) {
    case 'experience':
      prompt = generateExperiencePrompt(content);
      break;
    case 'summary':
      prompt = generateSummaryPrompt(content);
      break;
    // Add other sections (skills, education) here
    default:
      res.status(400);
      throw new Error(`Unsupported section for AI suggestion: ${section}`);
  }

  // Fetch suggestions from the OpenAI service
  const suggestions = await getAISuggestions(prompt);
  
  res.json({
    section,
    suggestions,
  });
});

export { getSuggestions };