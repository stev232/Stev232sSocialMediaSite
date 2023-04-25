const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  createReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought);

router.route('/:thoughtId/reactions').get(getSingleThought).post(createReaction);

module.exports = router;
