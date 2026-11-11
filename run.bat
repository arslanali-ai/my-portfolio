@echo off
title Arslan Ali Portfolio
echo ========================================================
echo   Arslan Ali - Futuristic AI Portfolio
echo ========================================================
echo.
echo [1/2] Clearing stale cache from Desktop...
if exist .vite (
    rd /s /q .vite 2>nul
)
if exist node_modules\.vite (
    rd /s /q node_modules\.vite 2>nul
)
echo [2/2] Launching Portfolio Server...
echo.
echo Server running at: http://localhost:3000
echo (Press Ctrl+C to stop)
echo.
call npm.cmd run dev
pause
