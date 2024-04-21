const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const tweetsRoutes = require('./tweets'); // This should refer to a router file, not a controller function
// const likesController = require('./likesController');
const authController = require('./authController');

router.use('/', homeRoutes);
router.use('/tweets', tweetsRoutes); // Make sure this is pointing to a router
// router.use('/likes', likesController);
// router.use('/auth', authController);

module.exports = router;
