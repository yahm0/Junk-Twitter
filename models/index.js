
const User = require('./User'); // Ensure the path is correct and file name matches case sensitivity
const Tweet = require('./Tweet'); // Ensure the path is correct and file name matches case sensitivity
const Like = require('./like');

User.hasMany(Tweet, { foreignKey: 'user_id' });
Tweet.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Like, { foreignKey: 'user_id' });
Tweet.hasMany(Like, { foreignKey: 'tweet_id' });

module.exports = { User, Tweet, Like };
