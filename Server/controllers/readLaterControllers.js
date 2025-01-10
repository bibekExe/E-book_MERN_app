import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import mongoose from 'mongoose';

//add book to readLater
export const addReadLater = async (req, res) => {
    try {
        const { resourceid, id } = req.headers;

        // Validate inputs
        if (!resourceid || !id) {
            return res.status(400).json({ message: "Resource ID and User ID are required" });
        }

        // Find the user
        const userData = await userModel.findById(id);
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
        await userModel.findByIdAndUpdate(id, { $push: { readLater: resourceid } });

        return res.status(200).json({ message: "Resource is added to your Read Later section" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//delete book from readLater