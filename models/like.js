const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}

Like.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tweet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tweets', // Ensures the reference to the tweets table
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Ensures the reference to the users table
        key: 'id'
      }
    },
    is_like: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: true, // Let Sequelize handle created_at, updated_at
    underscored: true, // To ensure the field names use snake_case, matching the SQL table
    tableName: 'likes', 
  });

module.exports = Like;
