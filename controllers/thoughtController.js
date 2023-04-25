const { Thought, Reaction } = require('../models');
const thoughtMessage = 'There were no thoughts found with that id';
const reactionMessage = 'There were no reactions found with that id';

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if(!thought) {
          res.status(404).json({ message: thoughtMessage });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return Post.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $push: { thought: thought._id } },
          { new: true }
        );
      })
      .then((thought) => {
        if(!thought) {
          res.status(404).json({ message: 'thought created, but no there are no thoughts with this ID' })
        }
        res.json({ message: 'thought created' })
      })
      .catch((err) => {
        console.error(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if(!thought) {
          res.status(404).json({ message: thoughtMessage });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if(!thought) {
          res.status(404).json({ message: thoughtMessage });
        }
        Thought.deleteMany({ _id: { $in: thought.reaction } });
      })
      .then(() => res.json({ message: 'Thought and associated reactions deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Reaction.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((reaction) => {
        if(!reaction) {
          res.status(404).json({ message: reactionMessage });
        }
        res.json(reaction);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  },

  deleteReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.reactionId })
      .then((reaction) => {
        if(!reaction) {
          res.status(404).json({ message: reactionMessage });
        }
      })
      .then(() => res.json({ message: 'The reaction was deleted!' }))
      .catch((err) => res.status(500).json(err));

  },
};
