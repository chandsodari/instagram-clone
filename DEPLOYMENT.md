# Deployment Guide

This guide will help you deploy the Instagram Clone application online.

## Prerequisites

1. **GitHub Account** - To host your code
2. **MongoDB Atlas Account** - Free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **Render Account** - For backend hosting (free tier available)
4. **Vercel Account** - For frontend hosting (free tier available)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (choose the free tier)
3. Create a database user (remember the username and password)
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs - less secure but easier)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/instagram-clone?retryWrites=true&w=majority`

## Step 2: Deploy Backend to Render

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/instagram-clone.git
   git push -u origin main
   ```

2. **Create Render Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `instagram-clone-backend`
     - **Root Directory:** `backend`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

3. **Add Environment Variables in Render:**
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `NODE_ENV` - `production`
   - `FRONTEND_URL` - Your Vercel frontend URL (you'll add this after deploying frontend)

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://instagram-clone-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. **Create Vercel Project:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Root Directory:** `frontend`
     - **Framework Preset:** Create React App
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`

2. **Add Environment Variable:**
   - `VITE_API_URL` - Your Render backend URL (e.g., `https://instagram-clone-backend.onrender.com`)
   
   > **Note:** Vite uses `VITE_` prefix for environment variables (not `REACT_APP_`)

3. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your frontend URL (e.g., `https://instagram-clone.vercel.app`)

## Step 4: Update CORS Settings

1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel frontend URL
3. Redeploy the backend service

## Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Try registering a new user
3. Create a post
4. Test all features

## Alternative: Deploy Both to Render

If you prefer to use Render for both frontend and backend:

1. **Backend:** Follow Step 2 above
2. **Frontend:** Create a new Static Site in Render:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
   - Add environment variable: `REACT_APP_API_URL` with your backend URL

## Troubleshooting

### Backend Issues

- **MongoDB Connection Error:** Check your MongoDB Atlas connection string and IP whitelist
- **CORS Errors:** Ensure `FRONTEND_URL` matches your frontend domain exactly
- **Build Fails:** Check that all dependencies are in `package.json`

### Frontend Issues

- **API Calls Fail:** Verify `REACT_APP_API_URL` is set correctly
- **Build Fails:** Ensure all dependencies are installed and React Scripts version is compatible
- **Blank Page:** Check browser console for errors

### Common Solutions

1. **Clear browser cache** after deployment
2. **Check environment variables** are set correctly
3. **Verify API endpoints** are accessible
4. **Check Render/Vercel logs** for detailed error messages

## Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
```

> **Note:** Vite uses `VITE_` prefix for environment variables (not `REACT_APP_`)

## Support

If you encounter issues:
1. Check the logs in Render/Vercel dashboards
2. Verify all environment variables are set
3. Ensure MongoDB Atlas cluster is running
4. Check that CORS settings allow your frontend domain

