@echo off
echo === Stopping KoreaGang Server ===
echo.

echo Looking for processes running on port 9191...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :9191 ^| find "LISTENING"') do (
    echo Found process ID: %%a
    taskkill /F /PID %%a
)

echo.
echo Server stopped.
pause
