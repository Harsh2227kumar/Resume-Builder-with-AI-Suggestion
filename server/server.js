import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

/**
 * @file server.js
 * @description Main entry point for the Express server application.
 */

// 1. Initialize Express App and DB Connection
connectDB();
const app = express();

// 2. Core Middleware
app.use(cors()); // Allow cross-origin requests from the client
app.use(express.json()); // Body parser for application/json

// 3. Simple Root Route for Health Check
app.get('/', (req, res) => {
  res.send('AI Resume Builder API is running...');
});

// 4. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);

// 5. Custom Error Handler Middleware (MUST be the last middleware)
app.use(errorHandler);

// 6. Start Server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});