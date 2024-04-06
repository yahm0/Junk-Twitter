const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the hashed password to the database
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during registration');
    }
};
