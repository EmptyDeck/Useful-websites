@echo off
setlocal
chcp 65001 >nul

set "PORT=%~1"
if "%PORT%"=="" set "PORT=8282"

echo === Stopping Trip Split Server ===
echo Looking for a server on port %PORT%...
echo.

set "FOUND="
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /r /c:":%PORT% .*LISTENING"') do (
  set "FOUND=1"
  echo Stopping process %%a
  taskkill /F /PID %%a
)

if not defined FOUND echo No listening process found on port %PORT%.
echo.
pause
