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
const Tweet = tweetModel(sequelize, Sequelize.DataTypes);
const Like = likeModel(sequelize, Sequelize.DataTypes);

// Define associations
User.hasMany(Tweet, { foreignKey: 'user_id' });
Tweet.belongsTo(User, { foreignKey: 'user_id' });

Tweet.hasMany(Like, { foreignKey: 'tweet_id' });
Like.belongsTo(Tweet, { foreignKey: 'tweet_id' });

User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

// Export models and Sequelize for use in other files
module.exports = {
    User,
    Tweet,
    Like,
    sequelize
  };