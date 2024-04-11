const express = require('express');
const router = express.Router();
const { Tweet, Like } = require('../models'); // Corrected import path

const likeTweet = async (req, res) => {
  try {
    const { userId, tweetId } = req.body;

    // Check if the tweet exists
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Prevent duplicate likes
    const [like, created] = await Like.findOrCreate({
      where: { user_id: userId, tweet_id: tweetId },
      defaults: { is_like: true }
    });

    if (!created) {
      return res.status(409).json({ message: 'You already liked this tweet' });
    }

    // If the like was successfully created
    res.status(201).json({ message: 'Tweet liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Liking tweet failed' });
  }
};

module.exports = likeTweet;
