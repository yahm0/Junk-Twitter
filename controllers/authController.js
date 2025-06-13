const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.authenticateUser = async (email, password) => {
    try {
        // Normalize email to lowercase before querying the database
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        
        if (!user) {
            // Avoid logging emails or other sensitive information in production
            console.log("User not found for email"); // Consider more secure logging practices
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Success case, return the user object
            return user;
        } else {
            // Password mismatch case
            console.log("Password mismatch for user"); // Consider more secure logging practices
            return null;
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
};
