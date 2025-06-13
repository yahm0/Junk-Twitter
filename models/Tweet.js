const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Tweet class that extends Model
class Tweet extends Model {}

// Initialize the model's schema and configuration
Tweet.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
                user_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                                model: 'user', // This references the 'users' table
                                key: 'id',
                        },
                },
                // Indicates whether a tweet should be automatically removed
                // once it's out of view on the client
                ephemeral: {
                        type: DataTypes.BOOLEAN,
                        allowNull: false,
                        defaultValue: false,
                },
        },
	{
		sequelize,
		modelName: 'tweet',
		freezeTableName: true,
		timestamps: true,
		underscored: true,
	},
);

module.exports = Tweet;
