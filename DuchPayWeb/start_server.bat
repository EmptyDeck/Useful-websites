@echo off
chcp 65001 >nul
set "PORT=%~1"
if "%PORT%"=="" set "PORT=8282"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start_server.ps1" %PORT%

echo.
pause
