const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    index: true
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true
  },
  caption: {
    type: String,
    default: '',
    maxlength: [2200, 'Caption cannot exceed 2200 characters'],
    trim: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
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
postSchema.index({ user: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });

// Virtual for like count
postSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

module.exports = mongoose.model('Post', postSchema);
