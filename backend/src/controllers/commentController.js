const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ 
        success: false,
        message: 'Comment text is required' 
      });
    }

    if (!postId) {
      return res.status(400).json({ 
        success: false,
        message: 'Post ID is required' 
      });
    }

    if (text.trim().length > 500) {
      return res.status(400).json({ 
        success: false,
        message: 'Comment cannot exceed 500 characters' 
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    const comment = new Comment({
      post: postId,
      user: req.user.id,
      text: text.trim()
    });

    await comment.save();
    await comment.populate('user', 'username profilePicture');

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({
      success: true,
      comment: {
        ...comment.toObject(),
        likeCount: comment.likeCount
      }
    });
  } catch (error) {
    console.error('Create comment error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid post ID' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while creating comment' 
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ 
        success: false,
        message: 'Comment not found' 
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to delete this comment' 
      });
    }

    const post = await Post.findById(comment.post);
    if (post) {
      post.comments = post.comments.filter(id => id.toString() !== req.params.id);
      await post.save();
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      success: true, 
      message: 'Comment deleted successfully' 
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid comment ID' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while deleting comment' 
    });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ 
        success: false,
        message: 'Comment not found' 
      });
    }

    const userId = req.user.id;
    const isLiked = comment.likes.some(id => id.toString() === userId);

    if (!isLiked) {
      comment.likes.push(userId);
      await comment.save();
    }

    res.status(200).json({ 
      success: true, 
      message: 'Comment liked',
      likeCount: comment.likes.length
    });
  } catch (error) {
    console.error('Like comment error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid comment ID' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while liking comment' 
    });
  }
};
