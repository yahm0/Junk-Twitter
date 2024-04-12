const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

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
        len: [8, 100], // Minimum and maximum length
      }
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    underscored: true,
    tableName: 'users',
    // hooks: {
    //   beforeCreate: async (user) => {
    //     const hashedPassword = await bcrypt.hash(user.password, 10);
    //     user.password = hashedPassword;
    //   }
    // }
});

module.exports = User;
