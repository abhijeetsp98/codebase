import express from 'express';
import { getTableData, setTableData } from '../controller/tableController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get table by table_number
router.get('/getTable/:tableName', protect, getTableData);
router.post('/setTable/:tableName', protect, setTableData);

export default router;
