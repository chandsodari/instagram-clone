const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Not authorized to access this route. Please provide a valid token.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User no longer exists' 
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired. Please login again.' 
      });
    }
    return res.status(401).json({ 
      success: false,
      message: 'Not authorized to access this route' 
    });
  }
};

module.exports = { protect };
