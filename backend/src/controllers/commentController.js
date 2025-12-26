const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    if (!text || !postId) {
      return res.status(400).json({ message: 'Post ID and text are required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      post: postId,
      user: req.user.id,
      text
    });

    await comment.save();
    await comment.populate('user');

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({
      success: true,
      comment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    const post = await Post.findById(comment.post);
    post.comments = post.comments.filter(id => id.toString() !== req.params.id);
    await post.save();

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (!comment.likes.includes(req.user.id)) {
      comment.likes.push(req.user.id);
      await comment.save();
    }

    res.status(200).json({ success: true, message: 'Comment liked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
