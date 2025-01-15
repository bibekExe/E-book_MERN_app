import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import mongoose from 'mongoose';

// Add resource to Read Later
export const addReadLater = async (req, res) => {
    try {
        const userId = req.headers.id; // Extract user ID from headers
        const { resourceid } = req.body; // Extract resource ID from body

        // Validate inputs
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        if (!resourceid) {
            return res.status(400).json({ message: "Resource ID is required" });
        }

        // Find the user
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Initialize `readLater` if it is null or undefined
        if (!Array.isArray(userData.readLater)) {
            userData.readLater = [];
        }

        // Check if the resource is already in the "Read Later" list
        const isReadLater = userData.readLater.includes(resourceid);
        if (isReadLater) {
            return res.status(200).json({ message: "Resource is already in your Read Later section" });
        }

        // Add the resource to the "Read Later" list
        await userModel.findByIdAndUpdate(userId, { $push: { readLater: resourceid } });

        return res.status(200).json({ message: "Resource is added to your Read Later section" });

    } catch (error) {
        console.error("Error in addReadLater:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Delete resource from Read Later
export const deleteFromReadLater = async (req, res) => {
    try {
        const userId = req.headers.id; // Extract user ID from headers
        const { resourceid } = req.body; // Extract resource ID from body

        // Validate inputs
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        if (!resourceid) {
            return res.status(400).json({ message: "Resource ID is required" });
        }

        // Find the user
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the resource exists in the "Read Later" list
        const isReadLater = userData.readLater.includes(resourceid);
        if (!isReadLater) {
            return res.status(404).json({ message: "Resource not found in your Read Later section" });
        }

        // Remove the resource from the "Read Later" list
        await userModel.findByIdAndUpdate(userId, { $pull: { readLater: resourceid } });

        return res.status(200).json({ message: "Resource removed from your Read Later section" });

    } catch (error) {
        console.error("Error in deleteFromReadLater:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Fetch all Read Later resources
export const getReadLater = async (req, res) => {
    try {
        const userId = req.headers.id; // Extract user ID from headers

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find the user
        const userData = await userModel.findById(userId).populate("readLater");
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the user's "Read Later" resources
        return res.status(200).json({
            success: true,
            message: "Read Later resources fetched successfully",
            data: userData.readLater,
        });
    } catch (error) {
        console.error("Error in getReadLater:", error.message);
        return res.status(500).json({ message: error.message });
    }
};
