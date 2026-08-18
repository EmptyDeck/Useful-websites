@echo off
REM Stops only tracker.py; other python programs are left alone.
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name like 'python%%'\" | Where-Object { $_.CommandLine -like '*tracker.py*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force; Write-Host ('stopped PID ' + $_.ProcessId) }"
echo.
pause
