import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import './Feed.css';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (pageNum = 1) => {
    try {
      setError('');
      const response = await axios.get(`/api/posts?page=${pageNum}&limit=10`);
      
      if (response.data.success) {
        if (pageNum === 1) {
          setPosts(response.data.posts || []);
        } else {
          setPosts(prev => [...prev, ...(response.data.posts || [])]);
        }
        setHasMore(response.data.pagination?.hasNext || false);
      } else {
        // Handle legacy response format
        setPosts(Array.isArray(response.data) ? response.data : []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load posts. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  if (loading && posts.length === 0) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="feed">
      <div className="feed-container">
        <CreatePost onPostCreated={handlePostCreated} />
        {error && <div className="error-message">{error}</div>}
        {posts.length === 0 && !loading ? (
          <div className="no-posts">No posts yet. Create your first post or follow users to see their posts!</div>
        ) : (
          <>
            {posts.map(post => (
              <Post key={post._id || post.id} post={post} onPostUpdated={() => fetchPosts(1)} />
            ))}
            {hasMore && (
              <button onClick={loadMore} className="load-more-btn" disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Feed;
