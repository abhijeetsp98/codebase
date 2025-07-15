// routes/projectRoutes.js
import express from 'express';
import Project from '../model/Project.js';

// Assuming you have an authMiddleware to protect routes
// import { protect } from '../middleware/authMiddleware.js'; // You'll need to create this if you don't have one

const router = express.Router();

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (requires authentication if using 'protect' middleware)
router.post('/', async (req, res) => { // Add 'protect' middleware if needed: router.post('/', protect, async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  try {
    // Check if project with this name already exists
    const projectExists = await Project.findOne({ name });

    if (projectExists) {
      return res.status(400).json({ message: 'Project with this name already exists' });
    }

    // Create new project
    const project = await Project.create({
      name,
      description,
      // You can set default values here or let the model handle them
      // status: 'active',
      // companiesCount: 0, // This will be updated later if companies are truly linked
    });

    if (project) {
      res.status(201).json({
        _id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        companiesCount: project.companiesCount,
        createdAt: project.createdAt,
        message: 'Project created successfully',
      });
    } else {
      res.status(400).json({ message: 'Invalid project data' });
    }
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;