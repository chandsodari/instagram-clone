const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getUser, 
  updateProfile, 
  followUser, 
  unfollowUser,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend
} = require('../controllers/userController');

const router = express.Router();

router.get('/:id', getUser);
router.put('/:id', protect, updateProfile);
router.post('/:id/follow', protect, followUser);
router.post('/:id/unfollow', protect, unfollowUser);
// Friends
router.post('/:id/friend-request', protect, sendFriendRequest);
router.post('/:id/friend-accept', protect, acceptFriendRequest);
router.post('/:id/friend-remove', protect, removeFriend);

module.exports = router;
