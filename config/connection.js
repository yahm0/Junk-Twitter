require('dotenv').config(); // This line loads the environment variables from the .env file
const { Sequelize } = require('sequelize');

// Heroku sets the JAWSDB_URL environment variable for JawsDB add-ons
const dbUrl = process.env.JAWSDB_URL;

// Create a Sequelize instance using the database URL from JawsDB
const sequelize = new Sequelize(dbUrl, {
  dialect: 'mysql',  // Specify the dialect
  logging: console.log,  // Enable SQL logging, set to false to disable
  pool: {
    max: 5,  // Maximum number of connections in the pool
    min: 0,  // Minimum number of connections in the pool
    acquire: 30000,  // The maximum time, in milliseconds, that the pool will try to get connection before throwing error
    idle: 10000  // The maximum time, in milliseconds, that a connection can be idle before being released
  },
  define: {
    timestamps: false  // Whether 'createdAt' and 'updatedAt' fields should be automatically added
  },
  dialectOptions: {
    ssl: {
      require: true,  // This is often needed if SSL is enabled in your MySQL service
      rejectUnauthorized: false  // This ensures SSL connection to the database without verifying the server's certificate
    }
  }
});

module.exports = sequelize;
