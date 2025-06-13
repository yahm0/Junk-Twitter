const db = require('../config/connection');
const { User, Tweet } = require('../models');
const userData = require('./userData.json');
const tweetData = require('./tweetData.json');

const seedDatabase = async () => {
  await User.deleteMany({});
  await Tweet.deleteMany({});

  const users = await User.insertMany(userData);

  const userMap = {};
  users.forEach((u, idx) => { userMap[idx + 1] = u._id; });

  const tweets = tweetData.map(t => ({
    content: t.content,
    user_id: userMap[t.user_id],
    ephemeral: t.ephemeral || false
  }));
  await Tweet.insertMany(tweets);

  console.log('Database seeded');
  process.exit(0);
};

db.once('open', seedDatabase);
