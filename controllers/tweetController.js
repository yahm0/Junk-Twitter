const express = require('express');
const router = express.Router();
const { User, Tweet } = require('../models'); // Simplified path due to index.js

const postTweet = async (req, res) => {
  try {
    const { userId, content } = req.body;

    // Optionally, validate the user exists
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new tweet
    const newTweet = await Tweet.create({
      content,
      user_id: userId // Ensure this matches the foreign key column name in your database
    });

    // Send a successful response back with the new tweet's ID
    res.status(201).json({ message: 'Tweet posted successfully', tweetId: newTweet.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Posting tweet failed' });
  }
};

// Export the controller function to be used in route definitions
module.exports = postTweet;

