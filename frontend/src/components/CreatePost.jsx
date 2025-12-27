import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

function CreatePost({ onPostCreated }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!image) {
      setError('Please select an image');
      return;
    }

    // Validate image size (10MB limit)
    if (image.length > 10 * 1024 * 1024) {
      setError('Image is too large. Please use an image smaller than 10MB.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/posts', {
        image,
        caption: caption.trim()
      });
      
      if (response.data.success && response.data.post) {
        onPostCreated(response.data.post);
        setCaption('');
        setImage('');
        // Reset file input
        const fileInput = document.getElementById('image');
        if (fileInput) fileInput.value = '';
      } else {
        setError(response.data.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      const errorMessage = error.response?.data?.message || 'Error creating post. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview" />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="caption">Caption:</label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows="3"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading || !image}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
