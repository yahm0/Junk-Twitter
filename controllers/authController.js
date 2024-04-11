const bcrypt = require('bcrypt');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
// Function to register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the database
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Respond with success if the user is registered
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);

        // Handle errors related to unique constraint violations
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send('Username or email already exists');
        } else {
            // General error handling
            res.status(500).send('An error occurred during registration');
        }
    }
};

// Function to authenticate a user
exports.authenticateUser = async (email, password) => {
    try {
        // Retrieve the user by their email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // No user found, return null
            return null;
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Passwords match, return user
            return user;
        } else {
            // Passwords do not match, return null
            return null;
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
};
