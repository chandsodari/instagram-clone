const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createGroup,
  getGroups,
  getGroup,
  joinGroup,
  leaveGroup
} = require('../controllers/groupController');

const router = express.Router();

router.post('/', protect, createGroup);
router.get('/', getGroups);
router.get('/:id', getGroup);
router.post('/:id/join', protect, joinGroup);
router.post('/:id/leave', protect, leaveGroup);

module.exports = router;
