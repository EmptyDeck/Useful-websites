@echo off
title Claude Usage
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3456"') do (taskkill /F /PID %%a >/dev/null 2>&1)
echo Done.
