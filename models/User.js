const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class User extends Model {}


User.init({
    // Model attributes corresponding to table fields
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: true, // Enables Sequelize to manage createdAt and updatedAt
    underscored: true, // Use snake_case rather than camelCase for automatically added attributes
    tableName: 'users' 
  });
  
  module.exports = User;
