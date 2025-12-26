import React, { useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import './Post.css';

function Post({ post, onPostUpdated }) {
  const [liked, setLiked] = useState(post.likes?.length > 0);
  const [likes, setLikes] = useState(post.likes?.length || 0);

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.post(`/api/posts/${post._id}/unlike`);
        setLikes(likes - 1);
      } else {
        await axios.post(`/api/posts/${post._id}/like`);
        setLikes(likes + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img 
          src={post.user?.profilePicture || 'https://via.placeholder.com/40'} 
          alt={post.user?.username}
          className="post-avatar"
        />
        <h3>{post.user?.username}</h3>
      </div>
      <img src={post.image} alt="Post" className="post-image" />
      <div className="post-actions">
        <button className="action-btn" onClick={handleLike}>
          {liked ? <FaHeart className="liked" /> : <FaRegHeart />}
        </button>
        <button className="action-btn">
          <FaComment />
        </button>
      </div>
      <div className="post-stats">
        <strong>{likes} likes</strong>
      </div>
      <div className="post-content">
        <p><strong>{post.user?.username}</strong> {post.caption}</p>
      </div>
    </div>
  );
}

export default Post;
