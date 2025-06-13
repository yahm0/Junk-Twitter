const router = require('express').Router();
const { User, Tweet } = require('../models'); // import both User and Tweet models
const bcrypt = require('bcrypt'); // For hashing passwords
const { authenticateUser } = require('./authController'); // Adjusted the path if necessary

// Route to serve the homepage
router.get('/homepage', async (req, res) => {
	if (req.session.user) {
		try {
			// Fetch tweets from the database that belong to the logged-in user
			const tweets = (
				await Tweet.findAll({
					include: [
						{
							model: User,
							attributes: ['username'],
						},
					],
					order: [['createdAt', 'DESC']],
				})
			).map((tweet) => tweet.get({ plain: true })); // This converts Sequelize instances to plain objects.

			res.render('homepage', {
				user: req.session.user, // Pass the entire user session
				tweets: tweets, // Pass the tweets array
				logged_in: true, // You can pass this to indicate that the user is logged in
			});
		} catch (error) {
			console.error('Failed to fetch tweets:', error);
			res.status(500).send('Error fetching tweets');
		}
	} else {
		res.redirect('/login');
	}
});

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
			req.session.save((err) => {
				// Explicitly save the session before sending response
				if (err) {
					console.error('Session save error:', err);
					res.json({ success: false, message: 'Session save failed.' });
				} else {
					res.json({ success: true }); // Indicate success and handle redirection client-side
				}
			});
		} else {
			res.status(401).json({ success: false, message: 'Invalid email or password.' });
		}
	} catch (error) {
		console.error('Error logging in user:', error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// Route to serve the signup page
router.get('/signup', (req, res) => {
	res.render('signup');
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
		req.session.save((err) => {
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

// Route to display a user's profile by id
router.get('/profile/:id', async (req, res) => {
        try {
                const userData = await User.findByPk(req.params.id, {
                        include: [
                                {
                                        model: Tweet,
                                        attributes: ['content', 'createdAt'],
                                },
                        ],
                });

                if (!userData) {
                        return res.status(404).send('User not found');
                }

                const profile = userData.get({ plain: true });

                res.render('profile', {
                        user: req.session.user,
                        profile,
                        tweets: profile.tweets,
                        logged_in: !!req.session.user,
                });
        } catch (err) {
                console.error('Failed to load profile:', err);
                res.status(500).send('Error loading profile');
        }
});

// Route to handle user logout
// Assuming this is inside your router setup file, such as authRoutes.js
router.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error('Failed to destroy the session during logout:', err);
			res.status(500).send({ message: 'Failed to log out, please try again.' });
		} else {
			res.send({ message: 'Logged out successfully' });
		}
	});
});

module.exports = router;
