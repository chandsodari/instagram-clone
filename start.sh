#!/bin/bash

# Instagram Clone - Start Both Servers Script for Mac/Linux

echo ""
echo "========================================"
echo "  Instagram Clone - Starting Servers"
echo "========================================"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "WARNING: MongoDB might not be running!"
    echo "Please start MongoDB:"
    echo "  Run: mongod"
    echo ""
fi

# Install concurrently if not already installed
echo "Checking for concurrently package..."
npm list concurrently > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Installing concurrently globally..."
    npm install -g concurrently
fi

echo ""
echo "Starting backend and frontend servers..."
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

npm run dev
