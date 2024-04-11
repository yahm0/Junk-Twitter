const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Import models
const UserModel = require('./User');
const TweetModel = require('./tweet');
const LikeModel = require('./like');