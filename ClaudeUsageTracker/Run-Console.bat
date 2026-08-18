@echo off
REM Debug mode: runs in a visible window with logs. Closing the window stops tracking.
set PY=%LOCALAPPDATA%\Programs\Python\Python313\python.exe
if not exist "%PY%" set PY=python
"%PY%" -u "%~dp0tracker.py"
pause
