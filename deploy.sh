#!/bin/bash

# Instagram Clone Deployment Script
# This script helps you prepare your project for deployment

echo "🚀 Instagram Clone - Deployment Preparation"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git initialized"
    echo ""
fi

# Check for .env files
echo "🔍 Checking environment files..."
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found"
    echo "📝 Creating backend/.env.example..."
    cat > backend/.env.example << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/instagram-clone
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
FRONTEND_URL=http://localhost:3000
EOF
    echo "✅ Created backend/.env.example"
    echo "   Please copy it to backend/.env and update with your values"
else
    echo "✅ backend/.env exists"
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  frontend/.env not found"
    echo "📝 Creating frontend/.env.example..."
    cat > frontend/.env.example << EOF
REACT_APP_API_URL=http://localhost:5000
EOF
    echo "✅ Created frontend/.env.example"
    echo "   Please copy it to frontend/.env and update with your values"
else
    echo "✅ frontend/.env exists"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Set up MongoDB Atlas (see DEPLOYMENT.md)"
echo "2. Update backend/.env with your MongoDB URI and JWT_SECRET"
echo "3. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/instagram-clone.git"
echo "   git push -u origin main"
echo "4. Deploy backend to Render (see DEPLOYMENT.md)"
echo "5. Deploy frontend to Vercel (see DEPLOYMENT.md)"
echo ""
echo "✨ Good luck with your deployment!"

