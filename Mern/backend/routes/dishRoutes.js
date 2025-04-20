import express from 'express';
import { createDish, getDishes, getDishById } from '../controller/dishController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, createDish);
router.get('/', protect, getDishes);
router.get('/:id', protect, getDishById);

export default router;
