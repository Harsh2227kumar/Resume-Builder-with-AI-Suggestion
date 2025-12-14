/**
 * @file prompts.js
 * @description Contains structured prompt templates for the Gemini service.
 */

// Base instruction to set the context for the AI model
const baseInstruction = "You are an expert resume analyst and career coach. Your task is to provide constructive, professional, and concise suggestions to improve the user's resume content.";

/**
 * Generates the prompt for suggesting improvements to the experience section.
 * @param {string} experienceText - The text from the user's experience section.
 * @returns {string} The full prompt for the AI.
 */
export const generateExperiencePrompt = (experienceText) => {
  return `${baseInstruction} Review the following work experience bullet points. Focus on: 1) Quantifying achievements with metrics, 2) Using strong action verbs, and 3) Ensuring relevancy.
  
  Current Experience Text:
  ---
  ${experienceText}
  ---
  
  Provide 3-5 distinct suggestions. Your entire response MUST be a valid JSON object containing a top-level key named "suggestions". Example format:
  {
    "suggestions": [
      { "type": "bullet_improvement", "target": "Experience", "suggestion": "Rewrite 'Managed a team' to 'Led a 5-person team, resulting in 20% efficiency gain'." }
    ]
  }`;
};

// Prompt for Summary Section
export const generateSummaryPrompt = (summaryText) => {
  return `${baseInstruction} Review the following professional summary. Focus on: 1) Clarity and conciseness, 2) Targeting the job goal, and 3) Highlighting key accomplishments.
  
  Current Summary Text:
  ---
  ${summaryText}
  ---
  
  Provide 3-5 distinct suggestions. Your entire response MUST be a valid JSON object containing a top-level key named "suggestions". Example format:
  {
    "suggestions": [
      { "type": "summary_improvement", "target": "Summary", "suggestion": "Your specific improvement suggestion here." }
    ]
  }`;
};