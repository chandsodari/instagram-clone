# 🚀 Deployment Fix Guide - Render & Vercel

## Quick Fix: Commit and Push Your Changes

Your changes need to be pushed to GitHub to trigger deployments.

## Step 1: Commit All Changes

```bash
cd c:\Users\chand\Desktop\ai\instagram-clone
git add .
git commit -m "Migrate to Vite and improve codebase"
git push origin main
```

This will automatically trigger deployments on both Render and Vercel if they're connected to your GitHub repo.

---

## 🔧 Render Deployment (Backend)

### If Auto-Deploy is NOT Working:

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Click on your service** (instagram-clone-backend)
3. **Manual Deploy Options:**
   - Click **"Manual Deploy"** button (top right)
   - OR click **"Deploy latest commit"**
   - OR go to **Settings** → **Manual Deploy** section

### If You Don't See Manual Deploy:

1. **Check Service Settings:**
   - Go to your service → **Settings** tab
   - Scroll to **"Build & Deploy"** section
   - Make sure **"Auto-Deploy"** is enabled
   - If disabled, enable it and save

2. **Trigger via Git:**
   - Make a small change (add a comment in a file)
   - Commit and push:
     ```bash
     git commit --allow-empty -m "Trigger deployment"
     git push origin main
     ```

3. **Redeploy via Render CLI:**
   ```bash
   # Install Render CLI
   npm install -g render-cli
   
   # Login
   render login
   
   # Deploy
   render deploy
   ```

### Update Render Configuration:

1. **Go to your service** → **Settings**
2. **Update these settings:**
   - **Root Directory:** `backend`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Health Check Path:** `/health`

3. **Environment Variables** (Settings → Environment):
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

4. **Save and Redeploy**

---

## ⚡ Vercel Deployment (Frontend)

### If Auto-Deploy is NOT Working:

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Find your project** (instagram-clone or similar)
3. **Manual Deploy Options:**
   - Click on your project
   - Go to **"Deployments"** tab
   - Click **"Redeploy"** button (three dots menu)
   - OR click **"Deploy"** → **"Deploy latest commit"**

### If You Don't See Deploy Button:

1. **Check Project Settings:**
   - Go to **Settings** → **Git**
   - Make sure GitHub repo is connected
   - Check **"Production Branch"** is set to `main`

2. **Reconnect Repository:**
   - Go to **Settings** → **Git**
   - Click **"Disconnect"** (if connected)
   - Click **"Connect Git Repository"**
   - Select your GitHub repo
   - Configure:
     - **Root Directory:** `frontend`
     - **Framework Preset:** Vite (or Other)
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Environment Variables** (Settings → Environment Variables):
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

4. **Deploy:**
   - Click **"Deploy"** button
   - Wait for build to complete

### Alternative: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

---

## 🔍 Troubleshooting

### Render Issues:

**Problem:** Service not deploying
- **Solution:** Check **Events** tab for errors
- **Solution:** Verify GitHub webhook is connected
- **Solution:** Check if service is paused (unpause it)

**Problem:** Build fails
- **Solution:** Check build logs in **Events** tab
- **Solution:** Verify `package.json` has all dependencies
- **Solution:** Check Node version (should be 18+)

**Problem:** Service crashes
- **Solution:** Check **Logs** tab
- **Solution:** Verify environment variables are set
- **Solution:** Check MongoDB connection string

### Vercel Issues:

**Problem:** Build fails
- **Solution:** Check build logs
- **Solution:** Verify `VITE_API_URL` is set
- **Solution:** Check that `vite.config.js` exists
- **Solution:** Verify output directory is `dist` (not `build`)

**Problem:** Blank page after deployment
- **Solution:** Check browser console for errors
- **Solution:** Verify `VITE_API_URL` points to correct backend
- **Solution:** Check CORS settings on backend

**Problem:** No deploy button visible
- **Solution:** Make sure you're the project owner
- **Solution:** Check if project is paused
- **Solution:** Try creating a new project

---

## ✅ Quick Checklist

### Before Deploying:

- [ ] All changes committed to git
- [ ] Changes pushed to GitHub
- [ ] Backend has all environment variables set
- [ ] Frontend has `VITE_API_URL` set
- [ ] MongoDB Atlas cluster is running
- [ ] CORS allows frontend domain

### After Deploying:

- [ ] Backend health check works: `https://your-backend.onrender.com/health`
- [ ] Frontend loads without errors
- [ ] API calls work (check browser console)
- [ ] Can register/login
- [ ] Can create posts

---

## 🆘 Still Not Working?

### For Render:
1. Check **Events** tab for error messages
2. Check **Logs** tab for runtime errors
3. Verify GitHub webhook: Settings → **Webhooks**
4. Try **"Clear build cache"** and redeploy

### For Vercel:
1. Check **Deployments** tab for build logs
2. Check **Functions** tab for serverless function errors
3. Verify **Environment Variables** are set correctly
4. Try **"Redeploy"** from a previous successful deployment

### Last Resort:
- **Delete and recreate** the service/project
- Make sure to copy all environment variables first
- Reconnect GitHub repository

---

## 📞 Need More Help?

1. **Render Support:** https://render.com/docs
2. **Vercel Support:** https://vercel.com/docs
3. **Check logs** in both dashboards for specific errors

