// Import dependencies
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors"; // Import CORS middleware
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import resourceRouter from "./routes/resource.js";
import readLaterRouter from "./routes/readLaterRoutes.js";

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not set in the environment variables.");
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// CORS Middleware Configuration
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://legal-read.vercel.app"] // Allowed origins in production
    : ["http://localhost:5173", "http://localhost:5174"]; // Allowed origins in development

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.error(`CORS error: Origin ${origin} is not allowed.`);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, headers)
  })
);

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

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(
    `Server is running on port: ${port} ${
      port === 3000 ? "(default port)" : ""
    }`
  );
});
