#!/bin/bash

# Instagram Clone - Complete Setup Script for Mac/Linux

echo ""
echo "========================================"
echo "  Instagram Clone - Setup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/4] Node.js found:"
node -v
echo ""

# Install backend dependencies
echo "[2/4] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
cd ..
echo "Backend dependencies installed successfully!"
echo ""

# Install frontend dependencies
echo "[3/4] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo "Frontend dependencies installed successfully!"
echo ""

# Create .env file if it doesn't exist
echo "[4/4] Creating .env file..."
if [ ! -f "backend/.env" ]; then
    cat > backend/.env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instagram-clone
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
EOF
    echo ".env file created successfully!"
else
    echo ".env file already exists - skipping"
fi
echo ""

echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Make sure MongoDB is running:"
echo "   - Run: mongod"
echo ""
echo "2. Start the backend server:"
echo "   - Terminal 1: cd backend && npm run dev"
echo ""
echo "3. Start the frontend server:"
echo "   - Terminal 2: cd frontend && npm start"
echo ""
echo "4. Open your browser and go to: http://localhost:3000"
echo ""
echo "To run both servers at once from root:"
echo "   npm run dev"
echo ""
