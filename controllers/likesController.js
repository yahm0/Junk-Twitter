const express = require('express');
const router = express.Router();
const { Tweet, Like } = require('../models');

const likeTweet = async (req, res) => {
  try {
    const { userId, tweetId } = req.body;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    const existing = await Like.findOne({ user_id: userId, tweet_id: tweetId });
    if (existing) {
      return res.status(409).json({ message: 'You already liked this tweet' });
    }

    await Like.create({ user_id: userId, tweet_id: tweetId, is_like: true });
    res.status(201).json({ message: 'Tweet liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Liking tweet failed' });
  }
};

module.exports = likeTweet;
