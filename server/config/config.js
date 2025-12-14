import dotenv from 'dotenv';

// Load .env from the server directory (process.cwd() is the server folder when running)
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
  nodeEnv: process.env.NODE_ENV,
};