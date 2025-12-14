import { GoogleGenAI } from '@google/genai';
import config from '../config/config.js'; 

/**
 * @file geminiService.js
 * @description Encapsulates communication with the Google Gemini API.
 */

// Initialize Gemini client with API key from config
const ai = new GoogleGenAI({
  apiKey: config.geminiApiKey,
});

/**
 * Sends a structured prompt to the Gemini API and returns parsed suggestions.
 * @param {string} prompt - The detailed instruction prompt for the AI.
 * @returns {Array} An array of suggestion objects.
 */
const getGeminiSuggestions = async (prompt) => {
  try {
    // Use a model capable of reliable JSON output
    const model = 'gemini-2.5-flash'; 

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        // Enforce JSON output structure
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    // The response text will be a stringified JSON object as requested
    const jsonString = response.text.trim();
    
    // Attempt to parse the JSON string
    const result = JSON.parse(jsonString);
    
    // The prompt ensures the structure is { "suggestions": [...] }
    return result.suggestions || [];
    
  } catch (error) {
    console.error('Gemini API Communication Error:', error.message);
    const apiError = new Error('Failed to fetch suggestions from Gemini service.');
    apiError.statusCode = 503; 
    throw apiError;
  }
};

export { getGeminiSuggestions };