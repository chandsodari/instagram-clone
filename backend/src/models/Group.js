const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Group name is required'],
    trim: true,
    minlength: [1, 'Group name must be at least 1 character'],
    maxlength: [100, 'Group name cannot exceed 100 characters']
  },
  description: {
    type: String,
    default: '',
    maxlength: [500, 'Description cannot exceed 500 characters'],
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required'],
    index: true
  },
  members: [
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
groupSchema.index({ owner: 1 });
groupSchema.index({ name: 'text' }); // Text search index

// Virtual for member count
groupSchema.virtual('memberCount').get(function() {
  return this.members ? this.members.length : 0;
});

module.exports = mongoose.model('Group', groupSchema);
