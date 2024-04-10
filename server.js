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
  cookie: { secure: false, maxAge: 3600000 } 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', homeRoutes);

// Default route
app.get('/', (req, res) => res.send(req.session.username ? `Hello, ${req.session.username}!` : 'Welcome!'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
