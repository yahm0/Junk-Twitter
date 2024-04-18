const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const routes = require('./controllers/index');
const helpers = require('./utils/helpers'); // Import your custom helpers

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars view engine
app.engine('handlebars', exphbs.create({
    defaultLayout: 'main', // assuming a main layout file for Handlebars
    extname: '.handlebars', // custom extension for Handlebars files
    helpers: helpers // include your custom helpers here
}).engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production only
        sameSite: 'lax' // Consider lax if you're facing issues with cross-site requests
    }
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Apply routes from the external router
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
