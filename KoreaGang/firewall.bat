@echo off
netsh advfirewall firewall delete rule name="KoreaGang HTTP Server" >nul 2>&1
netsh advfirewall firewall add rule name="KoreaGang HTTP Server" dir=in action=allow protocol=TCP localport=9191
if %errorlevel%==0 (echo OK - Firewall rule added for port 9191) else (echo FAILED - Run as Administrator)
pause
