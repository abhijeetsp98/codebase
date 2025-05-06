import express from 'express';
import { createLabour, getLabours } from '../controller/labourController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/addlabour', protect, createLabour);
router.get('/alllabour', protect, getLabours);

export default router;
