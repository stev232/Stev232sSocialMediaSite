const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  },
  username: { 
    type: String, 
    required: true 
  },
  reactions: [{ type: Schema.Types.ObjectId, ref: 'reaction' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount')
  .get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
