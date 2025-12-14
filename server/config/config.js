import dotenv from 'dotenv';

// Load .env from current working directory (server folder)
dotenv.config();

/**
 * @file config.js
 * @description Centralized configuration loader for the application.
 */
export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  openAiApiKey: process.env.OPENAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY, 
  nodeEnv: process.env.NODE_ENV || 'development', 
};