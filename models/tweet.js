const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Sequelize connection is initialized

class Tweet extends Model {}

Tweet.init({
    // model attributes that correspond to the tweet table fields
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
        model: 'users', 
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Tweet',
    timestamps: true, // Enables Sequelize to manage createdAt and updatedAt
    underscored: true, // Ensures the automatic attributes follow the snake_case convention
    tableName: 'tweets' 
  });

  module.exports = Tweet;