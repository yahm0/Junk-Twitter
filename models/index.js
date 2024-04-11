const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Import models
const userModel = require('./User');
const tweetModel = require('./tweet');
const likeModel = require('./like');

// Initialize models
const User = userModel(sequelize, Sequelize.DataTypes);
const tweet = tweetModel(sequelize, Sequelize.DataTypes);
const like = likeModel(sequelize, Sequelize.DataTypes);