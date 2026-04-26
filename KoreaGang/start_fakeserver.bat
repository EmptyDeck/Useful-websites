@echo off
echo === Starting Fake/Test Server ===
echo.
ipconfig | findstr /i "IPv4"
echo.

echo Starting server on port 8081...
python "%~dp0srv_xp7kqm2v.py" 8081

pause
