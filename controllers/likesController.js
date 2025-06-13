const router = require('express').Router();
const { Like, Tweet } = require('../models');

// Like a tweet
router.post('/:tweetId', async (req, res) => {
  try {
    const { tweetId } = req.params;
    const userId = req.session.user.id;

    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    const [like, created] = await Like.findOrCreate({
      where: { user_id: userId, tweet_id: tweetId },
      defaults: { is_like: true },
    });

    if (!created) {
      return res.status(409).json({ message: 'Already liked' });
    }

    res.status(201).json({ message: 'Liked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Liking tweet failed' });
  }
});

// Unlike a tweet
router.delete('/:tweetId', async (req, res) => {
  try {
    const { tweetId } = req.params;
    const userId = req.session.user.id;
    const deleted = await Like.destroy({ where: { user_id: userId, tweet_id: tweetId } });
    if (!deleted) {
      return res.status(404).json({ message: 'Like not found' });
    }
    res.json({ message: 'Unliked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unliking tweet failed' });
  }
});

module.exports = router;
