@echo off
REM winpty(pywinpty)가 설치된 시스템 파이썬으로 실행한다.
REM .venv 의 python 이 PATH 앞에 오면 winpty 가 없어서 서버가 죽는다.
set PY=%LOCALAPPDATA%\Programs\Python\Python313\pythonw.exe
if not exist "%PY%" set PY=pythonw
start "" "%PY%" "%~dp0server.py"
