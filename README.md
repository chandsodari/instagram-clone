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

Start the frontend:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

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

## Deploying (quick guide)

1. Create a GitHub repository and push your code (from repo root):

```bash
git remote remove origin || true
git remote add origin https://github.com/YOUR_USERNAME/instagram-clone.git
git branch -M main
git push -u origin main
```

2. Backend (Render):
- In Render, create a **Web Service** from your GitHub repo. Set the root to `/backend`.
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables in Render dashboard: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `FRONTEND_URL` (your frontend URL).

3. Frontend (Vercel):
- Import the same GitHub repo into Vercel, and set the project root to `/frontend`.
- Add environment variable `REACT_APP_API_URL` pointing to your deployed backend URL (e.g. `https://your-backend.onrender.com`).

4. After deployment:
- Ensure CORS `FRONTEND_URL` matches your frontend deployment domain.
- Do not commit actual `.env` files — use host env vars.

5. Locally (after these changes):
- Install new backend deps before running:

```bash
cd backend
npm install
```

The backend now includes basic security middlewares (Helmet and rate limiting). If you see "module not found" errors after pulling, run `npm install` in the `backend` folder.
