const { User, Thought } = require('../models');
const userMessage = 'There is no user with this id!';

module.exports = {  
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => {
        if(!user) {
          res.status(404).json({ message: userMessage });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if(!user) {
          res.status(404).json({ message: userMessage });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if(!user) {
          res.status(404).json({ message: userMessage });
        }
        Thought.deleteMany({ _id: { $in: user.thought } });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
