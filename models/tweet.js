const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Sequelize connection is initialized

class Tweet extends Model {}

Tweet.init({
    // Model attributes that correspond to the tweet table fields
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // This should be the table name when using custom model names or non-conventional setups
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Tweet',
    timestamps: true, // Enables Sequelize to manage createdAt and updatedAt
    underscored: true, // Ensures the automatic attributes follow the snake_case convention
    tableName: 'tweets' 
  });

module.exports = Tweet;
