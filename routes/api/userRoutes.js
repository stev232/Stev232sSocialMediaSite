const router = require('express').Router();
const {
  getSinglePost,
  getUsers,
  createPost,
} = require('../../controllers/postController');

router.route('/').get(getUsers).post(createPost);

router.route('/:postId').get(getSinglePost);

module.exports = router;
