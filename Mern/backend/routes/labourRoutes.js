import express from 'express';
import { createEmployee, getEmployee } from '../controller/employeeController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/addlabour', protect, createEmployee);
router.get('/alllabour', protect, getEmployee);

export default router;
