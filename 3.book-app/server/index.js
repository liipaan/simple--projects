import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 3000;
connectDB();
app.use("/api/books", bookRoutes);
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});