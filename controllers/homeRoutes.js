const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 3600000 // Cookie expiration time in milliseconds (optional)
    }
}));

// Login route
app.post('/login', (req, res) => {
    // Authenticate user
    // Set session data
    req.session.user = { /* user data */ };
    res.send('Logged in successfully');
});

// Logout route
app.get('/logout', (req, res) => {
    // Destroy session
    req.session.destroy();
    res.send('Logged out successfully');
});

// Registration route
app.post('/register', (req, res) => {
    // Create new user
    // Save user data
    res.send('User registered successfully');
});
