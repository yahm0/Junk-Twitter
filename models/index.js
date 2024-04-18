const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User'); // Ensure the path is correct and file name matches case sensitivity
const Tweet = require('./tweet'); // Ensure the path is correct and file name matches case sensitivity

User.hasMany(Tweet, { foreignKey: 'user_id', as: 'Tweets' });
Tweet.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

sequelize.sync({ force: false })
  .then(() => console.log("Models are synchronized with the database!"))
  .catch(error => console.error("Error synchronizing models with the database:", error));

module.exports = {
  User,
  Tweet,
  sequelize
};