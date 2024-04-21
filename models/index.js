const User = require('./User'); // Ensure the path is correct and file name matches case sensitivity
const Tweet = require('./Tweet'); // Ensure the path is correct and file name matches case sensitivity

User.hasMany(Tweet, { foreignKey: 'user_id' });
Tweet.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Tweet };
