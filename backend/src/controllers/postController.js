const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  try {
    const { image, caption } = req.body;

    if (!image || !image.trim()) {
      return res.status(400).json({ 
        success: false,
        message: 'Image is required' 
      });
    }

    // Validate image format (basic check for data URL)
    if (!image.startsWith('data:image/')) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid image format. Please provide a valid image.' 
      });
    }

    const post = new Post({
      user: req.user.id,
      image: image.trim(),
      caption: caption ? caption.trim() : ''
    });

    await post.save();
    await post.populate('user', 'username profilePicture');

    res.status(201).json({
      success: true,
      post: {
        ...post.toObject(),
        likeCount: post.likeCount,
        commentCount: post.commentCount
      }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while creating post' 
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('user', 'username profilePicture')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username profilePicture'
        },
        options: { sort: { createdAt: -1 }, limit: 10 }
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Post.countDocuments();
    const totalPages = Math.ceil(total / limit);

    // Add virtual fields
    const postsWithCounts = posts.map(post => ({
      ...post,
      likeCount: post.likes ? post.likes.length : 0,
      commentCount: post.comments ? post.comments.length : 0
    }));

    res.status(200).json({
      success: true,
      posts: postsWithCounts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while fetching posts' 
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username profilePicture bio')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username profilePicture'
        },
        options: { sort: { createdAt: -1 } }
      })
      .lean();

    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    res.status(200).json({
      success: true,
      post: {
        ...post,
        likeCount: post.likes ? post.likes.length : 0,
        commentCount: post.comments ? post.comments.length : 0
      }
    });
  } catch (error) {
    console.error('Get post error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid post ID' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while fetching post' 
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to delete this post' 
      });
    }

    // Also delete associated comments
    const Comment = require('../models/Comment');
    await Comment.deleteMany({ post: post._id });

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      success: true, 
      message: 'Post deleted successfully' 
    });
  } catch (error) {
    console.error('Delete post error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid post ID' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while deleting post' 
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    const userId = req.user.id;
    const isLiked = post.likes.some(id => id.toString() === userId);

    if (!isLiked) {
      post.likes.push(userId);
      await post.save();
    }

    res.status(200).json({ 
      success: true, 
      message: 'Post liked',
      likeCount: post.likes.length
    });
  } catch (error) {
    console.error('Like post error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid post ID' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while liking post' 
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    const userId = req.user.id;
    post.likes = post.likes.filter(id => id.toString() !== userId);
    await post.save();

    res.status(200).json({ 
      success: true, 
      message: 'Post unliked',
      likeCount: post.likes.length
    });
  } catch (error) {
    console.error('Unlike post error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid post ID' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error while unliking post' 
    });
  }
};
