const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
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
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100] // Minimum and maximum length
      }
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false, // Explicitly enable timestamps
    // createdAt: 'createdAt',
    // updatedAt: 'updatedAt'
});

module.exports = User;
