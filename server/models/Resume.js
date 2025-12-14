import mongoose from 'mongoose';

const { Schema } = mongoose;

// Sub-schema for Experience items
const experienceSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // Nullable for current job
  location: { type: String },
  responsibilities: [{ type: String }],
});

// Sub-schema for Education items
const educationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  gpa: { type: String },
});

const resumeSchema = new Schema(
  {
    // Link to the user who owns this resume (using ObjectId reference)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'My New Resume',
    },
    personalInfo: {
      fullName: { type: String },
      email: { type: String },
      phone: { type: String },
      linkedin: { type: String },
      portfolio: { type: String },
    },
    summary: { type: String },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [{ type: String }],
    projects: [
      {
        name: { type: String },
        description: { type: String },
        technologies: [{ type: String }],
        link: { type: String },
      },
    ],
    template: {
      type: String,
      default: 'Classic', // e.g., 'Classic', 'Modern', 'Minimal'
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;