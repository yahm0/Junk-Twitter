const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const homeRoutes = require('./controllers/homeRoutes');
const helpers = require('./utils/helpers');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

app.use(cookieParser());
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
    db: sequelize
  })
};
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.use('/', homeRoutes);

// Default route
app.get('/', (req, res) => res.send(req.session.username ? `Hello, ${req.session.username}!` : 'Welcome!'));


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));