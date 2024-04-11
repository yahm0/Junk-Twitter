const Sequelize = require('sequelize');
const sequelize = require('../config/connection'); 

// Import model files
const User = require('./User');
const Like = require('./Like');
const Tweet = require('./Tweet');

// Define model associations
User.hasMany(Tweet, { foreignKey: 'user_id', as: 'Tweets' });
Tweet.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

User.hasMany(Like, { foreignKey: 'user_id', as: 'Likes' });
Like.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

Tweet.hasMany(Like, { foreignKey: 'tweet_id', as: 'Likes' });
Like.belongsTo(Tweet, { foreignKey: 'tweet_id', as: 'Tweet' });

// Sync all models with database
sequelize.sync({ force: false })  // `force: true` will drop and recreate tables
  .then(() => {
    console.log("Models are synchronized with the database!");
  })
  .catch((error) => {
    console.error("Error synchronizing models with the database:", error);
  });

// Exporting the models and the sequelize connection
module.exports = {
  User,
  Like,
  Tweet,
  sequelize
};
