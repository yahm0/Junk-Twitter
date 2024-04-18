const express = require('express');
const router = express.Router();
const { Tweet, User } = require('../models');

// Post a tweet
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.session.user.id; // Replace with your session user ID logic

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

    // Send a successful response back with the new tweet object
    res.status(201).json({ tweet: newTweet }); // This sends the whole tweet object
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Posting tweet failed' });
  }
});

module.exports = router;
