const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For hashing passwords
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
    res.render('login');
});

// Route for handling login form submission
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.user = user; // Store user details in session
            req.session.save(err => { // Explicitly save the session before sending response
                if (err) {
                    console.error('Session save error:', err);
                    res.json({ success: false, message: 'Session save failed.' });
                } else {
                    res.json({ success: true }); // Indicate success and handle redirection client-side
                }
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid email or password." });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// Route to serve the signup page
router.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'main'  // Assuming you use a layout file named 'main.handlebars'
    });
});

// Route for handling sign-up form submission
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email: email.toLowerCase(), // Ensure email is stored in lowercase
            password: hashedPassword,
        });
        req.session.user = newUser; // Log in the new user automatically
        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                res.json({ success: false, message: 'Session save failed.' });
            } else {
                res.json({ success: true }); // Indicate success and handle redirection client-side
            }
        });
    } catch (error) {
        console.error('Error signing up user:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({ success: false, message: 'Email already exists.' });
        } else {
            res.status(500).json({ success: false, message: 'An error occurred during sign-up. Please try again.' });
        }
    }
});

// Route to serve the homepage
router.get('/homepage', (req, res) => {
    if (req.session.user) {
        res.render('homepage', { user: req.session.user });
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
