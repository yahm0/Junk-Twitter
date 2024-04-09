const { Router } = require('express');
// const database = require(../database);
const router = Router();

router.post('/login', async (req, res) => {
    try {
        // Perform authentication and fetch user data from the database
        const userData = await database.getUserData(req.body.username, req.body.password);
        
        if (!userData) {
            res.status(401).send('Invalid username or password');
            return;
        }

        // Set the user data in the session
        req.session.user = userData;

        res.send('Logged in successfully');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('An unexpected error occurred');
    }
});
router.get('/logout', (req, res) => { req.session.destroy(); res.send('Logged out successfully'); });
router.post('/register', (req, res) => res.send('User registered successfully'));

module.exports = router;