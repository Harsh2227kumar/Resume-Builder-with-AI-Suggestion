import { useState, useCallback } from 'react';
import { fetchAISuggestions } from '../services/aiService';

/**
 * @file useAISuggestions.js
 * @description Custom hook to manage the state and fetching logic for AI suggestions.
 */

export const useAISuggestions = (section, content, applySuggestion) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Triggers the API call to fetch suggestions.
   */
  const getSuggestions = useCallback(async () => {
    if (!content || content.trim() === '') {
      setError("Please enter some content before requesting suggestions.");
      setSuggestions([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const fetchedSuggestions = await fetchAISuggestions(section, content);
      setSuggestions(fetchedSuggestions);
    } catch (err) {
      setError(err.message);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [section, content]);

  /**
   * Applies a specific suggestion to the main resume state.
   * @param {string} newContent - The suggested revised content.
   */
  const handleApply = useCallback((newContent) => {
    applySuggestion(newContent);
    setSuggestions([]); // Clear suggestions after application
  }, [applySuggestion]);

  return {
    suggestions,
    isLoading,
    error,
    getSuggestions,
    handleApply,
    hasSuggestions: suggestions.length > 0,
  };
};