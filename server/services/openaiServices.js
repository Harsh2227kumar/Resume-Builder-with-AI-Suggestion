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
      model: 'gpt-3.5-turbo-1106', // Use a model capable of reliable JSON output
      messages: [
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }, // Instructs the model to return JSON
      temperature: 0.5,
    });

    // The response content will be a stringified JSON object
    const jsonString = response.choices[0].message.content.trim();
    
    // The model is instructed to return an array of suggestions, but the response_format
    // enforces a single JSON object. Assuming the model nests the array under a key like 'suggestions'.
    // Adjust parsing based on the exact JSON structure the model returns.
    const result = JSON.parse(jsonString);
    
    // Return the array of suggestions, assuming the array is directly the result or is under a 'suggestions' key
    return Array.isArray(result) ? result : result.suggestions || [];
    
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    throw new Error('Failed to fetch suggestions from AI service.');
  }
};

export { getAISuggestions };