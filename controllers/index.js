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
        secure: false, // Set to true if using HTTPS
        maxAge: 3600000 // Cookie expiration time in milliseconds (optional)
    }
}));

// Mount homeRoutes on the main Express app
app.use('/', homeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
