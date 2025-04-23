import express from 'express';
import { createTask, getTasks } from '../controller/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/addtask', protect, createTask);
router.get('/alltask', protect, getTasks);

export default router;
