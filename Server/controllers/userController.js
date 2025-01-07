import userModel from "../models/userModel.js";
import mongoose from "mongoose";

export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;

        console.log("User ID from request:", userId); // Debugging log

        // Validate userId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID" });
        }

        // Fetch user from the database
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Respond with user data
        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                id: user._id,
            },
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
