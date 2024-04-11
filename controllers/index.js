const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const tweetController = require('./tweetController');
const likesController = require('./likesController');
const authController = require('./authController');


router.use('/', homeRoutes);
// router.use('/tweets', tweetController);
// router.use('/likes', likesController);
// router.use('/auth', authController);

module.exports = router;
