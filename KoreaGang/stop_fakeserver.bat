@echo off
echo === Stopping Fake/Test Server ===
echo.

echo Looking for processes running on port 8081...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8081 ^| find "LISTENING"') do (
    echo Found test server process ID: %%a
    taskkill /F /PID %%a
)

echo.
echo Test Server stopped.
pause
