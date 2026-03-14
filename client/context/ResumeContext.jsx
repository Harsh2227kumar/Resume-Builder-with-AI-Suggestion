import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { INITIAL_RESUME_DATA, FORM_STEPS } from '../utils/constants';
import api from '../services/api';

/**
 * @file ResumeContext.jsx
 * @description Global state management for resume data, authentication, and flow.
 */

export const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  // --- Auth State ---
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // --- Resume State ---
  const [resume, setResume] = useState(INITIAL_RESUME_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [allResumes, setAllResumes] = useState([]);
  // FIX: Added Scale State - default to 0.7 as per existing hardcode
  const [scale, setScale] = useState(0.7); 

  // --- Auth and Initialization Effect ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); // Basic storage for simplicity
    
    if (token && storedUser) {
        try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
        } catch {
            // Invalid stored data, clear and log out
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
    setAuthLoading(false);
  }, []);
  
  // --- Auth Actions ---
  const handleLogin = useCallback((userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setResume(INITIAL_RESUME_DATA);
    setAllResumes([]);
  }, []);
  
  // --- Resume CRUD Operations ---
  
  const fetchAllResumes = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const response = await api.get('/resumes');
      setAllResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      // Handle 401: force logout if token is invalid
      if (error.response?.status === 401) handleLogout();
      setAllResumes([]);
    }
  }, [isAuthenticated, handleLogout]);

  const saveOrUpdateResume = useCallback(async (dataToSave = resume) => {
    if (!isAuthenticated) return;
    try {
      let response;
      if (dataToSave._id) {
        response = await api.put(`/resumes/${dataToSave._id}`, dataToSave);
      } else {
        response = await api.post('/resumes', dataToSave);
      }
      setResume(response.data); 
      fetchAllResumes(); 
      return response.data;
    } catch (error) {
      console.error('Error saving resume:', error.response?.data?.message || error.message);
      return null;
    }
  }, [isAuthenticated, resume, fetchAllResumes]);

  const deleteResume = useCallback(async (id) => {
    if (!isAuthenticated) return false;
    try {
        await api.delete(`/resumes/${id}`);
        fetchAllResumes();
        return true;
    } catch (error) {
        console.error('Error deleting resume:', error);
        return false;
    }
  }, [isAuthenticated, fetchAllResumes]);
  
  // --- Form Navigation & Data Manipulation ---

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const updateResumeData = useCallback((key, value, subKey = null, index = -1) => {
    setResume(prev => {
      let newResume = JSON.parse(JSON.stringify(prev)); // Deep clone for safety

      if (subKey && Array.isArray(newResume[key])) {
        if (index >= 0) {
          // Update item in array (e.g., editing a bullet point)
          Object.assign(newResume[key][index], value);
        } else {
          // Add new item to array (e.g., adding a new job)
          newResume[key] = [...newResume[key], value];
        }
      } else if (subKey) {
        // Handle nested object updates (e.g., personalInfo: { email: '...' })
        newResume[key] = { ...newResume[key], ...value };
      } else {
        // Handle top-level field updates (e.g., summary, template)
        newResume[key] = value;
      }
      return newResume;
    });
  }, []);

  // FIX: Function to update the scale factor
  const updateScale = useCallback((newScale) => {
    // Ensure newScale is a number and within reasonable bounds (0.25 to 1.0)
    const numericScale = parseFloat(newScale);
    if (!isNaN(numericScale) && numericScale >= 0.25 && numericScale <= 1.0) {
      setScale(numericScale);
    } else if (isNaN(numericScale)) {
      console.error("Invalid scale value provided.");
    }
  }, []);


  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    authLoading,
    handleLogin,
    handleLogout,
    
    resume,
    allResumes,
    setResume, 
    updateResumeData,
    saveOrUpdateResume,
    deleteResume,
    fetchAllResumes,
    
    currentStep,
    setCurrentStep, 
    FORM_STEPS,
    nextStep,
    prevStep,
    
    // FIX: Expose scale and updateScale
    scale,
    updateScale,
  }), [
    user, isAuthenticated, authLoading, handleLogin, handleLogout,
    resume, allResumes, saveOrUpdateResume, deleteResume, fetchAllResumes,
    currentStep, nextStep, prevStep, updateResumeData,
    scale, updateScale
  ]);

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};