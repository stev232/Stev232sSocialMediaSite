const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: { 
    type: String, 
    required: true,
    maxlength: 280,
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
    virtuals: true,
    getters: true,
  },
  id: false,
});

module.exports = reactionSchema;