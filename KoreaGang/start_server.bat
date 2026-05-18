@echo off
echo === KoreaGang Server ===
echo.
ipconfig | findstr /i "IPv4"
echo.
python "%~dp0srv_xp7kqm2v.py" 9191
pause
