import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import './Feed.css';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="feed">
      <div className="feed-container">
        <CreatePost onPostCreated={handlePostCreated} />
        {posts.length === 0 ? (
          <div className="no-posts">No posts yet. Follow users to see their posts!</div>
        ) : (
          posts.map(post => (
            <Post key={post._id} post={post} onPostUpdated={fetchPosts} />
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
