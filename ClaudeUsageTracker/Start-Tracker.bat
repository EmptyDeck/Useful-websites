@echo off
REM Claude usage tracker launcher.
REM Pass /noweb to skip opening the browser (used by the startup shortcut).
REM Uses the system Python that has pywinpty; the .venv python does not.

set PY=%LOCALAPPDATA%\Programs\Python\Python313\pythonw.exe
if not exist "%PY%" set PY=pythonw

REM Skip launching if it is already running (avoids port conflict).
powershell -NoProfile -Command "if (Get-CimInstance Win32_Process -Filter \"Name like 'python%%'\" | Where-Object { $_.CommandLine -like '*tracker.py*' }) { exit 1 } else { exit 0 }"
if errorlevel 1 goto ALREADY

start "" "%PY%" "%~dp0tracker.py"
ping -n 3 127.0.0.1 >nul

:ALREADY
if /I "%~1"=="/noweb" goto END
start "" http://localhost:3457

:END
