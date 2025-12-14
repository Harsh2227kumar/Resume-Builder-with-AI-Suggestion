import mongoose from 'mongoose';

const { Schema } = mongoose;

// Sub-schema for Experience items
const experienceSchema = new Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, 
  location: { type: String, trim: true },
  responsibilities: [{ type: String, trim: true }],
}, { _id: false }); // No need for separate IDs on sub-documents

// Sub-schema for Education items
const educationSchema = new Schema({
  institution: { type: String, required: true, trim: true },
  degree: { type: String, required: true, trim: true },
  fieldOfStudy: { type: String, trim: true },
  startDate: { type: Date },
  endDate: { type: Date },
  gpa: { type: String, trim: true },
}, { _id: false });

const resumeSchema = new Schema(
  {
    // Link to the user who owns this resume (using ObjectId reference)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true, // Index for faster lookup by user
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'My Professional Resume',
    },
    personalInfo: {
      fullName: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      portfolio: { type: String, trim: true },
    },
    summary: { type: String, trim: true },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [{ type: String, trim: true }],
    projects: [
      {
        name: { type: String, trim: true },
        description: { type: String, trim: true },
        technologies: [{ type: String, trim: true }],
        link: { type: String, trim: true },
      },
    ],
    template: {
      type: String,
      default: 'Classic', 
      enum: ['Classic', 'Modern', 'Minimal'] // Enforce template type
    },
  },
  {
    timestamps: true, 
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;