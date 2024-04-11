const Like = require('../models/index');

// Controller for adding a like to a card
exports.addLike = async (req, res) => {
    try {
        const { cardId } = req.params;
        const newLike = await Like.create({ userId: req.session.userId, cardId });
        res.status(201).json(newLike);
    } catch (error) {
        console.error('Error adding like:', error);
        res.status(500).json({ error: 'An error occurred while adding the like' });
    }
};

// Controller for removing a like from a card
exports.removeLike = async (req, res) => {
    try {
        const { cardId } = req.params;
        await Like.destroy({ where: { userId: req.session.userId, cardId } });
        res.json({ message: 'Like removed successfully' });
    } catch (error) {
        console.error('Error removing like:', error);
        res.status(500).json({ error: 'An error occurred while removing the like' });
    }
};

// Controller for adding a dislike to a card
exports.addDislike = async (req, res) => {
    try {
        const { cardId } = req.params;
        const newDislike = await Like.create({ userId: req.session.userId, cardId, isDislike: true });
        res.status(201).json(newDislike);
    } catch (error) {
        console.error('Error adding dislike:', error);
        res.status(500).json({ error: 'An error occurred while adding the dislike' });
    }
};

// Controller for removing a dislike from a card
exports.removeDislike = async (req, res) => {
    try {
        const { cardId } = req.params;
        await Like.destroy({ where: { userId: req.session.userId, cardId, isDislike: true } });
        res.json({ message: 'Dislike removed successfully' });
    } catch (error) {
        console.error('Error removing dislike:', error);
        res.status(500).json({ error: 'An error occurred while removing the dislike' });
    }
};
