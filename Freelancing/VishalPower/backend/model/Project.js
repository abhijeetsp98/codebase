// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Project names should probably be unique
    },
    description: { // Assuming you want to save the description too
      type: String,
      required: false, // Make it optional if not always provided
    },
    status: { // Assuming you want to save status
      type: String,
      default: 'active',
    },
    companiesCount: { // Storing the count of companies
      type: Number,
      default: 0,
    },
    createdAt: { // Storing creation date
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
    collection: 'projectName', // Explicitly name the collection
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;