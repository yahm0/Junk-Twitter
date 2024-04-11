const express = require('express');
const router = express.Router();
const database = require('../models/User');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

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
    res.render('login');
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

module.exports = router;
