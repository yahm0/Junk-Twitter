const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For hashing passwords
const User = require('../models/User'); // Assuming User model is exported directly from the User.js file
const { authenticateUser } = require('./authController'); // Adjusted the path if necessary

// Route to serve the main page
router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/homepage'); // Redirect to homepage if logged in
    } else {
        res.redirect('/login'); // Redirect to login if not logged in
    }
});

// Route for rendering the login page
router.get('/login', (req, res) => {
    res.render('partials/login');
});

// Route for handling login form submission
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.user = user; // Store user details in session
            res.redirect('/homepage');
        } else {
            res.status(401).render('partials/login', { error: "Invalid email or password." });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Server error');
    }
});

// Route to serve the signup page
router.get('/signup', (req, res) => {
    res.render('partials/signup', {
        layout: 'main'  // Assuming you use a layout file named 'main.handlebars'
    });
});

// Route for handling sign-up form submission
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.redirect('/login'); // Redirect to login after successful sign-up
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).render('partials/signup', { error: 'An error occurred during sign-up. Please try again.' });
    }
});

// Route to serve the homepage
router.get('/homepage', (req, res) => {
    if (req.session.user) {
        res.render('partials/homepage', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

// Route to handle user logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
            res.status(500).send('Logout failed.');
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;
