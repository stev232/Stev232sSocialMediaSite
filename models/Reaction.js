const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
