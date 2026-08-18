@echo off
REM Login window for the second account. CLAUDE_CONFIG_DIR is set only in this
REM window, so the claude you normally use is unaffected.

set CLAUDE_CONFIG_DIR=%USERPROFILE%\.claude-acct2
set PY=%LOCALAPPDATA%\Programs\Python\Python313\python.exe
if not exist "%PY%" set PY=python

"%PY%" "%~dp0login_help.py"
pause

claude

echo.
"%PY%" "%~dp0check_accounts.py"
echo.
pause
