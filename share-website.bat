@echo off
chcp 65001 >nul
cd /d "%~dp0"
title MR Sports - Live Share Tunnel

cls
echo ====================================================================
echo           MR SPORTS - UNIVERSAL LIVE SHARE TUNNEL
echo ====================================================================
echo.
echo [1/2] Checking local web server on port 8080...
start /b "" python -m http.server 8080 >nul 2>&1
timeout /t 1 /nobreak >nul

echo [2/2] Generating stable Cloudflare live link...
echo.
echo ====================================================================
echo Look for the "https://....trycloudflare.com" link below:
echo Share that link with anyone on Safari, Chrome, iPhone, Android, etc.
echo.
echo TIP FOR PHONES ON THE SAME WI-FI:
echo You can also open http://192.168.0.181:8080 directly on your phone!
echo.
echo NOTE: Keep this window OPEN while sharing. Close it to stop.
echo ====================================================================
echo.

call npx.cmd cloudflared tunnel --protocol http2 --url http://localhost:8080
pause
