const { Router } = require('express');
const database = require('../models/User');
const router = Router();

// Render login page
router.get('/login', (req, res) => {
    res.render('login'); // Renders login.handlebars
});

// Handle login logic, redirect if successful
router.post('/login', async (req, res) => {
    // Login logic...
    if (userData) {
        res.redirect('/homepage'); // Redirect to homepage on successful login
    } else {
        res.render('login', { error: 'Invalid username or password' }); // Re-render login page with error
    }
});

// Render registration page
router.get('/register', (req, res) => {
    res.render('register'); // Renders register.handlebars
});

// Handle registration logic
router.post('/register', async (req, res) => {
    // Registration logic...
    res.redirect('/login'); // Redirect to login page after successful registration
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
});

// Registration route
router.post('/register', async (req, res) => {
    try {
        await database.createUser(req.body.username, req.body.password);
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

// router.post('/post/new', postTweet);
// router.post('/post/:id/like', likeTweet);

module.exports = router;
