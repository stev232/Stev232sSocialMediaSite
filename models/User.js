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
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
  friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount')
  .get(function() {
    return this.friends.length;
  });

const User = model('User', userSchema);

module.exports = User;

/*const handleError = (err) => console.error(err);

User.create(
  {
    item: 'banana',
    stockCount: 10,
    price: 1,
    inStock: true,
  },
  (err) => (err ? handleError(err) : console.log('Created new document'))
);*/