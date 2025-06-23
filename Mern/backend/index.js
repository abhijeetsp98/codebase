import express from "express"
import dotenv from "dotenv"
import cors from 'cors'

import route from "./routes/userRoute.js"
import connectDB from "./config/db.js"

import authRoutes from './routes/authRoutes.js';
import dishRoutes from './routes/dishRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoute.js';
import labourRoute  from './routes/labourRoutes.js';
import inventoryRoute from './routes/inventoryRoutes.js'
import tableRoute from './routes/tableRoutes.js'
import chatGPTRoute from './routes/chatGPTRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dish', dishRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use("/api/labour", labourRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/table", tableRoute);
app.use("/api/ai", chatGPTRoute);

// 🟢 Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});