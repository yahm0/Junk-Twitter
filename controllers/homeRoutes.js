const express = require('express');
const router = express.Router();
const database = require('../models/User');
// const path = require('path');

// Set the views directory
// app.set('views', path.join(__dirname, 'views'));

// Route for the root path ("/")
router.get('/', (req, res) => {
    // You can render a specific template or redirect to another route here
    // For example:
    res.render('main'); // Render a template
    // or
    // res.redirect('/login'); // Redirect to another route
});

// Route for rendering the login page
router.get('/login', (req, res) => {
    res.render('partials/login');
});

// Route for rendering the sign-up page
router.get('/signup', (req, res) => {
    res.render('partials/signup'); // Assumes you have a 'signup.handlebars' view
});

// Route for rendering the sign-up page
router.get('/card', (req, res) => {
    res.render('partials/card'); // Assumes you have a 'signup.handlebars' view
});

// Route for rendering the sign-up page
router.get('/homepage', (req, res) => {
    res.render('partials/homepage'); // Assumes you have a 'signup.handlebars' view
});

// Route for handling login form submission
router.post('/login', async (req, res) => {
    try {
        // Login logic...
        if (userData) {
            res.redirect('/homepage');
        } else {
            res.render('login', { error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

// Route for handling sign-up form submission
router.post('/signup', async (req, res) => {
    try {
        // Extract form data from request body
        const { username, email, password } = req.body;
        
        // Here you would typically hash the password and store the new user in your database
        // For demonstration, let's pretend we're calling a 'create' method on your user model
        const newUser = await database.User.create({
            username,
            email,
            password: hashPassword(password), // Ensure you hash passwords before storing!
        });

        // Redirect to the login page after successful sign-up, or to the homepage, etc.
        res.redirect('/login');
    } catch (error) {
        console.error('Error signing up user:', error);
        // Render the sign-up page again with an error message
        res.render('signup', { error: 'An error occurred during sign-up. Please try again.' });
    }
});

module.exports = router;
