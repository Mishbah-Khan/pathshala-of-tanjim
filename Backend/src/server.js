import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import ownerRoutes from './routes/ownerRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://pathshala-of-tanjim-7ru4.vercel.app/',
  'https://pathshala-of-tanjim.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Database
connectDB();

// Routes
app.use('/api/owner', ownerRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/public', publicRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send("✅ Tanjim's Pathshala API is running...");
});

// IMPORTANT FOR VERCEL
export default app;