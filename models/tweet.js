const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/schema.sql'); // Sequelize connection is initialized
const User = require('./User'); // Importing the User model to establish associations

class Tweet extends Model {}
