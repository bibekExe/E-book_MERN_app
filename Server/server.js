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
    'https://clinquant-cuchufli-da38a3.netlify.app',
    'https://e-book-mern-app.vercel.app'
];

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'], // Allowed methods
    credentials: true, // Allow credentials
}));
app.options('*', (req, res) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        return res.sendStatus(204);
    } else {
        return res.status(403).send('CORS not allowed');
    }
});
app.use(express.json());
app.use(cookieParser());

// Global middleware for missing CORS headers
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    next();
});

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