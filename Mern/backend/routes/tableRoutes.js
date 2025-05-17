import express from 'express';
import { getTableDetails,getTablesStatus, addOrderToTable, checkoutTable } from '../controller/tableController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get table by table_number
router.get('/tableStatus', protect, getTablesStatus);
router.get('/:id', protect, getTableDetails);
router.post('/:id/addOrder', protect, addOrderToTable);
router.get('/:id/checkout', protect, checkoutTable);

export default router;
