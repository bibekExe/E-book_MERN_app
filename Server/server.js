import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import resourceRouter from "./routes/resource.js";
import readLaterRouter from "./routes/readLaterRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Define allowed origins for CORS
const allowedOrigins = [
    'http://localhost:5173',
    'https://clinquant-cuchufli-da38a3.netlify.app', // Add deployed frontend URL
    'https://e-book-mern-app.vercel.app'
];

// Configure CORS options
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// API Endpoints
app.get('/', (req, res) => res.send("API is running"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/resource', resourceRouter);
app.use('/api/readlater', readLaterRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    } else {
        next();
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => console.log(`Server is running on port: ${port}`));
