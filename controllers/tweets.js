const router = require('express').Router();
const { User, Tweet } = require('../models');

// Post a tweet
router.post('/', async (req, res) => {
        try {
                const { content } = req.body;
                const userId = req.session.user._id;

                const userExists = await User.findById(userId);
                if (!userExists) {
                        return res.status(404).json({ message: 'User not found' });
                }

                const newTweet = await Tweet.create({
                        content,
                        user_id: userId,
                });

                res.status(201).json({ tweet: newTweet });
        } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Posting tweet failed' });
        }
});

// Delete a tweet by id
router.delete('/:id', async (req, res) => {
        try {
                const tweetId = req.params.id;

                const deleted = await Tweet.findByIdAndDelete(tweetId);
                if (!deleted) {
                        return res.status(404).json({ message: 'Tweet not found' });
                }

                res.json({ message: 'Tweet deleted' });
        } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Failed to delete tweet' });
        }
});

module.exports = router;
