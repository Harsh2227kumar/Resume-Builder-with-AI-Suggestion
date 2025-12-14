import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

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

const app = express();

// Security Middleware (Helmet, CORS, Mongo Sanitize)
app.use(helmet());
app.use(cors({ origin: '*', credentials: true })); 
app.use(express.json({ limit: '10kb' })); 
app.use(mongoSanitize()); 

// Rate Limiting to prevent brute-force attacks on public routes
const limiter = rateLimit({
  max: 100, 
  windowMs: 60 * 60 * 1000, 
  message: 'Too many requests from this IP, please try again after an hour',
});
app.use('/api', limiter); 

// Simple Root Route for Health Check
app.get('/', (req, res) => {
  res.send('Smart Resume Builder API is running...');
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);

// Custom Error Handler Middleware (MUST be the last middleware)
app.use(errorHandler);

// Function to start the server after DB connection
const startServer = async () => {
  try {
    // 1. Wait for DB connection
    await connectDB(); 
    const PORT = config.port;
    
    // 2. Start server only if DB connection succeeds
    app.listen(PORT, () => {
      console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to DB error. Exiting.', error);
    process.exit(1);
  }
};

startServer();