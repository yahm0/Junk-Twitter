const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const homeRoutes = require('./controllers/homeRoutes');
require('dotenv').config();

const app = express();
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        maxAge: 3600000 // 1 hour
    }
}));

// Mount homeRoutes on the main Express app
app.use('/', homeRoutes);

// Route handler for the home page
app.get('/', (req, res) => {
    if (req.session.username) {
        res.send(`Hello, ${req.session.username}!`);
    } else {
        res.send('Welcome!');
    }
});

// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
