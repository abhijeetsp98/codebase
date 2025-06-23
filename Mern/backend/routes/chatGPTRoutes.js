import express from 'express';
import { askGPT } from '../controller/chatGPTController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/ask', protect, askGPT)

export default router;
