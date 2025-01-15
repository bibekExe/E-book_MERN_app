import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import resourceRouter from "./routes/resource.js";
import readLaterRouter from "./routes/readLaterRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://e-book-mern-app.vercel.app", // Deployed Vercel frontend
];

// Configure CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      console.error(`Blocked by CORS: ${origin}`); // Log blocked origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  credentials: true, // Allow cookies or authentication headers
  allowedHeaders: ["Content-Type", "Authorization", "auth-token"], // Specify allowed headers
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cookieParser()); // Parse cookies

// Health Check Endpoint
app.get("/", (req, res) => res.send("API is running"));

// API Endpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/resource", resourceRouter);
app.use("/api/readlater", readLaterRouter);

// Handle 404 Errors
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Start the Server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
