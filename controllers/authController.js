const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        await User.create({ username, email, password: hashedPassword });

        // Send a success response
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);

        // Handle specific errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send('Username or email already exists');
        }

        // Handle other errors
        res.status(500).send('An error occurred during registration');
    }
};