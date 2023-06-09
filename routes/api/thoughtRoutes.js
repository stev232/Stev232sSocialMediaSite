const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  createThought,
  deleteThought,
  /*createReaction,
  deleteReaction,*/
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
//router.route('/thoughts/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;
