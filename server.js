const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const routes = require('./controllers');
const helpers = require('./utils/helpers'); // Import your custom helpers

const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Use SESSION_SECRET from environment
const sess = {

        secret: process.env.SESSION_SECRET,
	cookie: {
		maxAge: 300000,
		httpOnly: true,
		secure: false,
		sameSite: 'strict',
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),

};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Apply routes from the external router
app.use(routes);

db.once('open', () => {
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
});
