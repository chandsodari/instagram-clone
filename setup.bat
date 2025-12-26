@echo off
REM Instagram Clone - Complete Setup Script for Windows

echo.
echo ========================================
echo   Instagram Clone - Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Node.js found: %cd%
node -v
echo.

REM Install backend dependencies
echo [2/4] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..
echo Backend dependencies installed successfully!
echo.

REM Install frontend dependencies
echo [3/4] Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo Frontend dependencies installed successfully!
echo.

REM Create .env file if it doesn't exist
echo [4/4] Creating .env file...
if not exist "backend\.env" (
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/instagram-clone
        echo JWT_SECRET=your_jwt_secret_key_change_this_in_production
        echo NODE_ENV=development
    ) > backend\.env
    echo .env file created successfully!
) else (
    echo .env file already exists - skipping
)
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Make sure MongoDB is running:
echo    - Windows: Open Services and start "MongoDB"
echo    - Or run: mongod
echo.
echo 2. Start the backend server:
echo    - Terminal 1: cd backend ^&^& npm run dev
echo.
echo 3. Start the frontend server:
echo    - Terminal 2: cd frontend ^&^& npm start
echo.
echo 4. Open your browser and go to: http://localhost:3000
echo.
echo To run both servers at once from root:
echo   npm run dev
echo.
pause
