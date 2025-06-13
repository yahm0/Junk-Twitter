const { Schema, model, Types } = require('mongoose');

const tweetSchema = new Schema(
  {
    content: { type: String },
    user_id: { type: Types.ObjectId, ref: 'User', required: true },
    ephemeral: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = model('Tweet', tweetSchema);
