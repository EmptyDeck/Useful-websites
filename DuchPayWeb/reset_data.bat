@echo off
setlocal
chcp 65001 >nul

pushd "%~dp0"

echo This will remove all local expenses, logs, and uploaded receipt images.
choice /c YN /m "Reset local data?"
if errorlevel 2 (
  echo Cancelled.
  popd
  exit /b 0
)

echo []> expenses.json
if exist expenses_log.json del /f /q expenses_log.json
if exist dist\uploads (
  for %%f in (dist\uploads\*) do (
    if /i not "%%~nxf"==".gitkeep" del /f /q "%%f"
  )
)

echo Local data reset.
popd
pause
