const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createComment,
  deleteComment,
  likeComment
} = require('../controllers/commentController');

const router = express.Router();

router.post('/', protect, createComment);
router.delete('/:id', protect, deleteComment);
router.post('/:id/like', protect, likeComment);

module.exports = router;
