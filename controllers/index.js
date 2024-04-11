const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const homeRoutes = require('./homeRoutes');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: false, maxAge: 3600000 } 
}));

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('../views', path.join(__dirname, '../views')); // Adjust this path based on your directory structure

// Routes setup
app.use('/', homeRoutes);

// Route to render a Handlebars view
app.get('/', (req, res) => {
    res.render('index', { 
        username: req.session.username || null
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
