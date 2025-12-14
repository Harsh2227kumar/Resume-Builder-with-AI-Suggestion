import OpenAI from 'openai';
import config from '../config/config.js'; 

/**
 * @file openaiService.js
 * @description Encapsulates communication with the OpenAI API.
 */

// Initialize OpenAI client with API key from config
const openai = new OpenAI({
  apiKey: config.openAiApiKey,
});

/**
 * Sends a structured prompt to the OpenAI API and returns parsed suggestions.
 * @param {string} prompt - The detailed instruction prompt for the AI.
 * @returns {Array} An array of suggestion objects.
 */
const getAISuggestions = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      // FIX: Changed to the stable base model to resolve potential versioning/access issues
      model: 'gpt-3.5-turbo', 
      messages: [
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }, 
      temperature: 0.5,
    });

    const jsonString = response.choices[0].message.content.trim();
    const result = JSON.parse(jsonString);
    
    return result.suggestions || [];
    
  } catch (error) {
    // Log the specific API error for debugging
    console.error('OpenAI API Communication Error:', error.message); 

    // Create a custom error to handle the 503 status
    const apiError = new Error('Failed to fetch suggestions from AI service. Check logs for details.');
    apiError.statusCode = 503; 
    throw apiError;
  }
};

export { getAISuggestions };