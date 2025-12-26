const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost
} = require('../controllers/postController');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.delete('/:id', protect, deletePost);
router.post('/:id/like', protect, likePost);
router.post('/:id/unlike', protect, unlikePost);

module.exports = router;
