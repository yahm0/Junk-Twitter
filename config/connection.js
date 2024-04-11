require('dotenv').config(); // This line loads the environment variables from the .env file
const { Sequelize } = require('sequelize');

// Create a Sequelize instance with connection information
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: console.log, // Set to false if you do not want SQL logging
  pool: {
    max: 5, // Maximum number of connection in pool
    min: 0, // Minimum number of connection in pool
    acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000 // The maximum time, in milliseconds, that a connection can be idle before being released
  },
  define: {
    timestamps: false // Set to true if you want 'createdAt' and 'updatedAt' fields
  }
});

module.exports = sequelize;
