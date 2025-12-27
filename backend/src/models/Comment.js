const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post is required'],
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    index: true
  },
  text: {
    type: String,
    required: [true, 'Comment text is required'],
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ user: 1 });

// Virtual for like count
commentSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

module.exports = mongoose.model('Comment', commentSchema);
