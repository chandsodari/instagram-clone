@echo off
REM Instagram Clone Deployment Script for Windows
REM This script helps you prepare your project for deployment

echo.
echo 🚀 Instagram Clone - Deployment Preparation
echo ==========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    git branch -M main
    echo ✅ Git initialized
    echo.
)

REM Check for .env files
echo 🔍 Checking environment files...
if not exist "backend\.env" (
    echo ⚠️  backend\.env not found
    echo 📝 Please create backend\.env with the following:
    echo    PORT=5000
    echo    NODE_ENV=development
    echo    MONGODB_URI=mongodb://localhost:27017/instagram-clone
    echo    JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
    echo    FRONTEND_URL=http://localhost:3000
) else (
    echo ✅ backend\.env exists
)

if not exist "frontend\.env" (
    echo ⚠️  frontend\.env not found
    echo 📝 Please create frontend\.env with the following:
    echo    REACT_APP_API_URL=http://localhost:5000
) else (
    echo ✅ frontend\.env exists
)

echo.
echo 📋 Next Steps:
echo 1. Set up MongoDB Atlas (see DEPLOYMENT.md)
echo 2. Update backend\.env with your MongoDB URI and JWT_SECRET
echo 3. Push to GitHub:
echo    git add .
echo    git commit -m "Ready for deployment"
echo    git remote add origin https://github.com/YOUR_USERNAME/instagram-clone.git
echo    git push -u origin main
echo 4. Deploy backend to Render (see DEPLOYMENT.md)
echo 5. Deploy frontend to Vercel (see DEPLOYMENT.md)
echo.
echo ✨ Good luck with your deployment!
pause

