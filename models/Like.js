const { Schema, model, Types } = require('mongoose');

const likeSchema = new Schema(
  {
    tweet_id: { type: Types.ObjectId, ref: 'Tweet', required: true },
    user_id: { type: Types.ObjectId, ref: 'User', required: true },
    is_like: { type: Boolean, required: true }
  },
  { timestamps: true }
);

module.exports = model('Like', likeSchema);
