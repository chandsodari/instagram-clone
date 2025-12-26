import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { FaUsers, FaLayerGroup } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📸 InstagramClone
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <FaHome /> Home
          </Link>
          <Link to="/friends" className="nav-link">
            <FaUsers /> Friends
          </Link>
          <Link to="/groups" className="nav-link">
            <FaLayerGroup /> Groups
          </Link>
          <Link to={`/profile/${user?.id}`} className="nav-link">
            Profile
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
