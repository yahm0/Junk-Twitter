const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers/index');

const app = express();

const hbs = exphbs.create({ helpers });

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(cookieParser());
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  // resave: false,
  // saveUninitialized: true,
  // store: new SequelizeStore({
  //   db: sequelize
  // })
};
// app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set the directory where your views are located
app.set('views', path.join(__dirname, 'views'));

// // Default route
app.get('/', (req, res) => {
  res.render('./layouts/main', { username: req.session.username });
});

app.get('/some-route', (req, res) => {
  const someData = {}; // Your data here
  res.render('card', { layout: 'main', tweets: someData });
});

app.use('/', routes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));