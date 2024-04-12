const bcrypt = require('bcrypt');
const User = require('../models/User');
const express = require('express');
const router = express.Router();

// Function to authenticate a user
exports.authenticateUser = async (email, password) => {
    try {
        // Retrieve the user by their email (consider case sensitivity based on your DB)
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            console.log("User not found for email:", email); // For debugging, consider removing for production
            return null;
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log("Password match for user:", email); // For debugging, consider removing for production
            return user;
        } else {
            console.log("Password mismatch for user:", email); // For debugging, consider removing for production
            return null;
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
};