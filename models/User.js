const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    trim: true,
    unique: true, 
  },
  // using a regex match command
  email: { 
    type: String,  
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

/*userSchema.virtual('friendCount')
  .get(function() {
    return this.friends.length;
  });*/

const User = model('User', userSchema);

module.exports = User;