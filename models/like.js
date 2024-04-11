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
        model: 'tweets', 
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    is_like: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: true, // Let Sequelize handle created_at, updated_at
    underscored: true, // To ensure the field names use snake_case, matching the SQL table
    tableName: 'likes', 
  });
  
  module.exports = Like;