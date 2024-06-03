import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from './asyncHandler.js';

// Middleware to check if the user is authenticated
const authenticated = asyncHandler(async (req, res, next) => {
    try {
        // Check if token exists in cookies
        const token = req.cookies.jwt;

        if (!token) {
            throw new Error("Not authorized, no token.");
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            throw new Error("Not authorized, token invalid.");
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        // Handle errors
        res.status(401).send(error.message);
    }
});

// Middleware to check if the user is an admin
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send("Not authorized as admin.");
    }
};

export { authenticated, authorizeAdmin };
