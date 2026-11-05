@echo off
setlocal
title Everyday Utility Desk
cd /d "%~dp0"

echo ============================================================
echo  Everyday Utility Desk - Setup and Start
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or is not available on PATH.
  echo Install the current Node.js LTS release from https://nodejs.org/
  echo Then run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm was not found. Reinstall Node.js LTS and include npm.
  pause
  exit /b 1
)

echo Node version:
node --version
echo npm version:
call npm --version
echo.
echo Dependencies will be installed or safely updated before startup.
echo The browser address will be http://localhost:5173
echo Press Ctrl+C in this window to stop the website.
echo.

call npm run dev
if errorlevel 1 (
  echo.
  echo [ERROR] The development server stopped with an error.
  echo Run UPDATE_DEPENDENCIES.bat, then try this launcher again.
  pause
  exit /b 1
)

endlocal
