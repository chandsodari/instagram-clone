import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

function CreatePost({ onPostCreated }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (!image) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/posts', {
        image,
        caption
      });
      onPostCreated(response.data.post);
      setCaption('');
      setImage('');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
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
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
