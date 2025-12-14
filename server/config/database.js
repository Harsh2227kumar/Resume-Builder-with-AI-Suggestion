import mongoose from 'mongoose';
import config from './config.js';

/**
 * @file database.js
 * @description Establishes and manages the MongoDB connection.
 */
const connectDB = async () => {
  try {
    // Recommended setting for Mongoose
    mongoose.set('strictQuery', true); 
    
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Do not exit here; let server.js handle the graceful exit after failing to connect
    throw error; 
  }
};

export default connectDB;