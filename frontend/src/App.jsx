import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';

// Set axios base URL for API calls (production or local)
// Vite uses VITE_ prefix for environment variables
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Friends from './pages/Friends';
import Groups from './pages/Groups';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      {user && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Feed /> : <Navigate to="/login" />} />
        <Route path="/profile/:id" element={user ? <Profile currentUser={user} /> : <Navigate to="/login" />} />
        <Route path="/friends" element={user ? <Friends /> : <Navigate to="/login" />} />
        <Route path="/groups" element={user ? <Groups /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
