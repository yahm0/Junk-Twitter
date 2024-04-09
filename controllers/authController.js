const bcrypt = require('bcrypt'),
      User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body,
              hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });
        res.send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during registration');
    }
}