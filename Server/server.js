import express from "express";
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
http://localhost:3000

// Middleware to set the specific CORS header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://legal-read.vercel.app");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173'");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, auth-token");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Endpoints
app.get("/", (req, res) => res.send("API is running"));
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

// Start the server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
