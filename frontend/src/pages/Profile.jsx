import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Profile.css';

function Profile({ currentUser }) {
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setProfile(response.data);
        setIsFollowing(response.data.followers.some(f => f._id === currentUser.id));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, currentUser.id]);

  const refetchProfile = async () => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      setProfile(response.data);
      setIsFollowing(response.data.followers.some(f => f._id === currentUser.id));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/api/users/${id}/unfollow`);
        setIsFollowing(false);
      } else {
        await axios.post(`/api/users/${id}/follow`);
        setIsFollowing(true);
      }
      refetchProfile();
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="loading">Profile not found</div>;
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <img 
            src={profile.profilePicture || 'https://via.placeholder.com/150'} 
            alt={profile.username}
            className="profile-picture"
          />
          <div className="profile-info">
            <div className="username-section">
              <h1>{profile.username}</h1>
              {currentUser?.id !== id && (
                <button 
                  className={`follow-btn ${isFollowing ? 'following' : ''}`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
            <div className="stats">
              <div className="stat">
                <strong>0</strong> posts
              </div>
              <div className="stat">
                <strong>{profile.followers?.length || 0}</strong> followers
              </div>
              <div className="stat">
                <strong>{profile.following?.length || 0}</strong> following
              </div>
            </div>
            <p className="bio">{profile.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
