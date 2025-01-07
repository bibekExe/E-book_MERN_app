import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    try {
        // Extract the token from cookies
        const { token } = req.cookies;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
        }

        // Verify and decode the token
        const tokenDecoder = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID to the request object
        if (tokenDecoder.id) {
            req.userId = tokenDecoder.id; // Attach userId to req
        } else {
            return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
        }

        // Proceed to the next middleware or route
        next();
    } catch (error) {
        // Handle any errors during token verification
        return res.status(401).json({ success: false, message: "Authentication failed: " + error.message });
    }
};

export default userAuth;
