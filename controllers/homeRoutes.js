const { Router } = require('express');
const router = Router();

router.post('/login', (req, res) => { req.session.user = {/* user data */}; res.send('Logged in successfully'); });
router.get('/logout', (req, res) => { req.session.destroy(); res.send('Logged out successfully'); });
router.post('/register', (req, res) => res.send('User registered successfully'));

module.exports = router;

