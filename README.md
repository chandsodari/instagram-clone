# Instagram Clone - Full Stack Practice Project

A modern Instagram clone built with React, Node.js/Express, and MongoDB. Perfect for practice coding and learning full-stack development.

## Features

✨ **User Features**
- User registration and authentication (JWT)
- User profiles with bio and profile picture
- Follow/unfollow functionality
- User profile viewing

📸 **Post Features**
- Create posts with image and caption
- Like/unlike posts
- View post feed
- Delete own posts

💬 **Comment Features**
- Add comments to posts
- Delete own comments
- Like comments

## Project Structure

```
instagram-clone/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── server.js       # Express app setup
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── hooks/          # Custom React hooks
    │   ├── utils/          # Utility functions
    │   ├── App.js
    │   └── index.js
    └── public/
```

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server (replaces Create React App)
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS** - Styling
- **React Icons** - Icon library

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

#### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instagram-clone
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

#### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend (using Vite):
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

> **Note:** This project uses **Vite** instead of Create React App for faster development and better performance.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/follow` - Follow user
- `POST /api/users/:id/unfollow` - Unfollow user

### Posts
- `POST /api/posts` - Create post
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/unlike` - Unlike post

### Comments
- `POST /api/comments` - Create comment
- `DELETE /api/comments/:id` - Delete comment
- `POST /api/comments/:id/like` - Like comment

## Learning Objectives

This project teaches:
- ✅ RESTful API design
- ✅ User authentication with JWT
- ✅ Database design with MongoDB
- ✅ React hooks and state management
- ✅ Component composition
- ✅ API integration with Axios
- ✅ Form handling and validation
- ✅ Protected routes
- ✅ Error handling
- ✅ CSS styling

## Recent Improvements ✨

### Backend Improvements
- ✅ Enhanced models with database indexes for better performance
- ✅ Improved error handling with consistent response format
- ✅ Added input validation and sanitization
- ✅ Better authentication middleware with user verification
- ✅ Pagination support for posts
- ✅ Improved MongoDB connection handling
- ✅ Enhanced security with rate limiting and CORS configuration
- ✅ Health check endpoint for monitoring

### Frontend Improvements
- ✅ Better error handling and user feedback
- ✅ Loading states for better UX
- ✅ Pagination support for posts feed
- ✅ Improved form validation
- ✅ Better error messages

### Deployment
- ✅ Deployment configuration files (Render & Vercel)
- ✅ Comprehensive deployment guide
- ✅ Environment variable examples
- ✅ Deployment helper scripts

## Future Enhancements

- [ ] Real-time notifications with Socket.io
- [ ] Image upload to cloud storage (AWS S3)
- [ ] Search functionality
- [ ] Direct messaging
- [ ] Stories feature
- [ ] Hashtags and mentions
- [ ] Post filtering
- [ ] User discovery
- [ ] Activity feed
- [ ] Dark mode

## Common Issues & Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify firewall settings for local/cloud MongoDB

### CORS Errors
- Check that backend is running on port 5000
- Verify axios baseURL in frontend matches backend URL

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)  
lsof -ti:3000 | xargs kill -9
```

## Contributing

Feel free to fork, improve, and submit pull requests!

## License

MIT License - feel free to use this project for learning

## Support

Need help? Check the code comments and understand how each part works!

## Quick Deployment Guide 🚀

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Start:

1. **Set up MongoDB Atlas** (free tier available)
2. **Deploy Backend to Render:**
   - Connect GitHub repo
   - Root directory: `backend`
   - Add env vars: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `FRONTEND_URL`
3. **Deploy Frontend to Vercel:**
   - Connect GitHub repo
   - Root directory: `frontend`
   - Add env var: `REACT_APP_API_URL` (your Render backend URL)
4. **Update CORS:** Set `FRONTEND_URL` in Render to match your Vercel URL

### Using Deployment Scripts:

**Windows:**
```bash
deploy.bat
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Environment Variables:

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend.onrender.com
```

> **Note:** Vite uses `VITE_` prefix for environment variables (not `REACT_APP_`)

> ⚠️ **Important:** Never commit `.env` files. Use environment variables in your hosting platform.
