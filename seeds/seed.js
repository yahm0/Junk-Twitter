const sequelize = require('../config/connection');
const { User, Tweet } = require('../models');
// Like
const userData = require('./userData.json');
const tweetData = require('./tweetData.json');
// const likesData = require('./likesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Tweet.bulkCreate(tweetData, {
    individualHooks: true,
    returning: true,
  });

  // await Like.bulkCreate(likesData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedDatabase();
