import { useResume } from '../context/ResumeContext'; 
import { useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * @file useResumeData.js
 * @description Provides simplified access to resume data and update functions.
 */

export const useResumeData = () => {
  const { 
    resume, 
    updateResumeData, 
    saveOrUpdateResume,
    currentStep,
    nextStep,
    prevStep,
    FORM_STEPS
  } = useResume();

  const updateField = useCallback((key, value) => {
    updateResumeData(key, value);
  }, [updateResumeData]);

  const updatePersonalInfo = useCallback((key, value) => {
    updateResumeData('personalInfo', { [key]: value }, true);
  }, [updateResumeData]);
  
  // Example for updating an array of data (e.g., adding a new Education item)
  const addArrayItem = useCallback((key, newItem) => {
      updateResumeData(key, newItem, true, -1);
      toast.success(`New ${key.slice(0, -1)} added.`);
  }, [updateResumeData]);

  // Example for deleting an item from a list (e.g., deleting an Experience entry)
  const deleteArrayItem = useCallback((key, index) => {
    // This requires slightly more complex logic not fully handled by current updateResumeData
    // For now, we update the whole array safely via setResume
    // In final implementation, context method should be enhanced for delete
    const newArray = resume[key].filter((_, idx) => idx !== index);
    updateResumeData(key, newArray);
    toast.success(`${key.slice(0, -1)} removed.`);
  }, [resume, updateResumeData]);


  return {
    resume,
    currentStep,
    FORM_STEPS,
    updateField,
    updatePersonalInfo,
    addArrayItem,
    deleteArrayItem,
    saveOrUpdateResume,
    nextStep,
    prevStep,
  };
};