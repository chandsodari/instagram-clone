import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Friends() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/users/${storedUser.id}`);
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching friends:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSendRequest = async (id) => {
    try {
      await axios.post(`/api/users/${id}/friend-request`);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const res = await axios.get(`http://localhost:5000/api/users/${storedUser.id}`);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error sending request');
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`/api/users/${id}/friend-accept`);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const res = await axios.get(`http://localhost:5000/api/users/${storedUser.id}`);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error accepting request');
    }
  };

  if (loading) return <div className="loading">Loading friends...</div>;
  if (!profile) return <div className="loading">No profile found</div>;

  return (
    <div className="container">
      <h2>Friends</h2>
      <section>
        <h3>Incoming Requests</h3>
        {profile.incomingRequests?.length ? (
          profile.incomingRequests.map(r => (
            <div key={r._id} style={{display:'flex',gap:12,alignItems:'center'}}>
              <img src={r.profilePicture || 'https://via.placeholder.com/40'} alt="avatar" style={{width:40,height:40,borderRadius:20}} />
              <span>{r.username}</span>
              <button onClick={() => handleAccept(r._id)}>Accept</button>
            </div>
          ))
        ) : (<div>No incoming requests</div>)}
      </section>

      <section>
        <h3>Friends</h3>
        {profile.friends?.length ? (
          profile.friends.map(f => (
            <div key={f._id} style={{display:'flex',gap:12,alignItems:'center'}}>
              <img src={f.profilePicture || 'https://via.placeholder.com/40'} alt="avatar" style={{width:40,height:40,borderRadius:20}} />
              <span>{f.username}</span>
            </div>
          ))
        ) : (<div>No friends yet</div>)}
      </section>
    </div>
  );
}

export default Friends;
