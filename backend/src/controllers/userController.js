const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture')
      .populate('friends', 'username profilePicture')
      .populate('incomingRequests', 'username profilePicture')
      .populate('outgoingRequests', 'username profilePicture')
      .lean();

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user,
        followerCount: user.followers ? user.followers.length : 0,
        followingCount: user.following ? user.following.length : 0,
        friendCount: user.friends ? user.friends.length : 0
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid user ID' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while fetching user' 
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, bio, profilePicture } = req.body;
    const userId = req.params.id;

    // Check if user is updating their own profile
    if (userId !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to update this profile' 
      });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Update fields if provided
    if (username) {
      if (username.length < 3) {
        return res.status(400).json({ 
          success: false,
          message: 'Username must be at least 3 characters' 
        });
      }
      user.username = username.trim().toLowerCase();
    }
    
    if (bio !== undefined) {
      if (bio.length > 500) {
        return res.status(400).json({ 
          success: false,
          message: 'Bio cannot exceed 500 characters' 
        });
      }
      user.bio = bio.trim();
    }
    
    if (profilePicture) {
      user.profilePicture = profilePicture.trim();
    }

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        success: false,
        message: `${field} already exists` 
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid user ID' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while updating profile' 
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userIdToFollow = req.params.id;
    const currentUserId = req.user.id;

    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      currentUser.following.push(userIdToFollow);
      await userToFollow.save();
      await currentUser.save();
    }

    res.status(200).json({ success: true, message: 'User followed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const userIdToUnfollow = req.params.id;
    const currentUserId = req.user.id;

    const userToUnfollow = await User.findById(userIdToUnfollow);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId);
    currentUser.following = currentUser.following.filter(id => id.toString() !== userIdToUnfollow);
    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json({ success: true, message: 'User unfollowed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Friends: send friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const targetId = req.params.id;
    const currentUserId = req.user.id;

    if (targetId === currentUserId) {
      return res.status(400).json({ message: "Can't send friend request to yourself" });
    }

    const target = await User.findById(targetId);
    const currentUser = await User.findById(currentUserId);

    if (!target || !currentUser) return res.status(404).json({ message: 'User not found' });

    if (currentUser.friends.includes(targetId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    if (currentUser.outgoingRequests.includes(targetId)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    // add request
    currentUser.outgoingRequests.push(targetId);
    target.incomingRequests.push(currentUserId);

    await currentUser.save();
    await target.save();

    res.status(200).json({ success: true, message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept friend request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const requesterId = req.params.id;
    const currentUserId = req.user.id;

    const requester = await User.findById(requesterId);
    const currentUser = await User.findById(currentUserId);

    if (!requester || !currentUser) return res.status(404).json({ message: 'User not found' });

    // check if there is an incoming request
    if (!currentUser.incomingRequests.map(id => id.toString()).includes(requesterId)) {
      return res.status(400).json({ message: 'No incoming friend request from this user' });
    }

    // remove from incoming/outgoing
    currentUser.incomingRequests = currentUser.incomingRequests.filter(id => id.toString() !== requesterId);
    requester.outgoingRequests = requester.outgoingRequests.filter(id => id.toString() !== currentUserId);

    // add to friends
    currentUser.friends.push(requesterId);
    requester.friends.push(currentUserId);

    await currentUser.save();
    await requester.save();

    res.status(200).json({ success: true, message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove friend or cancel request
exports.removeFriend = async (req, res) => {
  try {
    const otherId = req.params.id;
    const currentUserId = req.user.id;

    const other = await User.findById(otherId);
    const currentUser = await User.findById(currentUserId);

    if (!other || !currentUser) return res.status(404).json({ message: 'User not found' });

    // remove from friends if present
    currentUser.friends = currentUser.friends.filter(id => id.toString() !== otherId);
    other.friends = other.friends.filter(id => id.toString() !== currentUserId);

    // remove any pending requests
    currentUser.incomingRequests = currentUser.incomingRequests.filter(id => id.toString() !== otherId);
    currentUser.outgoingRequests = currentUser.outgoingRequests.filter(id => id.toString() !== otherId);
    other.incomingRequests = other.incomingRequests.filter(id => id.toString() !== currentUserId);
    other.outgoingRequests = other.outgoingRequests.filter(id => id.toString() !== currentUserId);

    await currentUser.save();
    await other.save();

    res.status(200).json({ success: true, message: 'Friend removed / request canceled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
