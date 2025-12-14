import api from './api';

/**
 * @file authService.js
 * @description Service layer for user authentication (Login/Register).
 */

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data; // { _id, name, email, token }
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed.' };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // { _id, name, email, token }
  } catch (error) {
    throw error.response?.data || { message: 'Login failed.' };
  }
};