@echo off
setlocal
title Everyday Utility Desk - Update Dependencies
cd /d "%~dp0"

echo ============================================================
echo  Everyday Utility Desk - Dependency Update
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Install Node.js LTS from https://nodejs.org/ first.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm was not found. Reinstall Node.js LTS.
  pause
  exit /b 1
)

echo Installing declared dependencies…
call npm install --no-audit --no-fund
if errorlevel 1 goto :failed

echo Checking compatible updates…
call npm run deps:update
if errorlevel 1 goto :failed

echo Verifying the production build…
call npm run build
if errorlevel 1 goto :failed

echo.
echo [SUCCESS] Dependencies and build are ready.
pause
exit /b 0

:failed
echo.
echo [ERROR] Setup did not complete. Review the message above.
pause
exit /b 1
