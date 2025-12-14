import api from './api';

/**
 * @file aiService.js
 * @description Service for interacting with the Gemini suggestion endpoint.
 */

/**
 * Fetches AI-generated suggestions for a specific resume section.
 * @param {string} section - The resume section being analyzed (e.g., 'experience', 'summary').
 * @param {string} content - The text content to be analyzed.
 * @returns {Promise<Array>} An array of suggestion objects.
 */
export const fetchAISuggestions = async (section, content) => {
  try {
    const response = await api.post('/ai/suggestions', {
      section,
      content,
    });
    // Backend is configured to return { section, suggestions: [...] }
    return response.data.suggestions || [];
  } catch (error) {
    console.error('Error fetching AI suggestions:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to get suggestions.');
  }
};