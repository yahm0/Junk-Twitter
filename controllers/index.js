const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const homeRoutes = require('./homeRoutes'); // Ensure this file exports a router
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 3600000 } // Adjust based on environment
}));

// View engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Adjust this path based on your directory structure

// Use routes from the router. This replaces app.get('/', ...) if homeRoutes handles '/'
app.use('/', homeRoutes);

// Add your routes directly if not using homeRoutes for them
app.get('/login', (req, res) => {
    res.render('login', { logged_in: false });
});

app.get('/signup', (req, res) => {
    res.render('signup', { logged_in: false });
});

app.get('/homepage', (req, res) => {
    // Mock data for demonstration; replace with your actual data fetching logic
    const cardsData = [
        {
            id: 1,
            name: 'Card Name',
            description: 'This is a description of the card.',
            user: { name: 'User Name' },
            timestamp: '2022-04-05' // Ensure timestamps are formatted as you desire
        },
        // Add more card objects as needed
    ];
    res.render('homepage', { cards: cardsData });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const hbs = exphbs.create({});
hbs.registerPartial('card', fs.readFileSync(path.join(__dirname, 'views/partials/card.handlebars'), 'utf8'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
