import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

/**
 * @file api.js
 * @description Configures the Axios client for API interaction.
 */

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token to requests
api.interceptors.request.use(
  (config) => {
    // Check for token in localStorage on the client side
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear token and redirect to login page
      if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          // window.location.href = '/login'; // Use router for cleaner navigation in Next.js
          console.error("Authentication expired or failed. Redirecting to login.");
      }
    }
    // Propagate error to be handled by specific component
    return Promise.reject(error);
  }
);

export default api;