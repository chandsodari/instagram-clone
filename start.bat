@echo off
REM Instagram Clone - Start Both Servers Script for Windows

echo.
echo ========================================
echo   Instagram Clone - Starting Servers
echo ========================================
echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
mongosh --eval "db.adminCommand('ping')" >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: MongoDB might not be running!
    echo Please start MongoDB:
    echo   1. Open Services and start "MongoDB"
    echo   2. Or run: mongod
    echo.
)

REM Install concurrently if not already installed
echo Checking for concurrently package...
npm list concurrently >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing concurrently globally...
    npm install -g concurrently
)

echo.
echo Starting backend and frontend servers...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

npm run dev
