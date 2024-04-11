const { Router } = require('express');
const database = require('../models/User');
const router = Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const userData = await database.getUserData(req.body.username, req.body.password);
        
        if (!userData) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        req.session.user = userData;
        res.json({ message: 'Logged in successfully', user: userData });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
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
