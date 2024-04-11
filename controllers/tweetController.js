const { User, Tweet } = require('../models'); // Path to the model

const postTweet = async (req, res) => {
  try {
    const { userId, content } = req.body;

    // Optionally, validate the user exists
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTweet = await Tweet.create({
      content,
      user_id: userId // Ensure this matches the foreign key column name
    });

    res.status(201).json({ message: 'Tweet posted successfully', tweetId: newTweet.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Posting tweet failed' });
  }
};