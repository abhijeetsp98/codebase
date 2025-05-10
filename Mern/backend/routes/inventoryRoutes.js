import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addInventory, getInventory } from '../controller/inventoryController.js';
const router = express.Router();

router.post('/addInventory', protect, addInventory);
router.get('/allInventory', protect, getInventory);

export default router;
