const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
});

module.exports = model('User', userSchema);
