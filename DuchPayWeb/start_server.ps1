param(
  [string]$PortArg
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

chcp 65001 > $null
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'
$env:PYTHONUTF8 = '1'
$env:PYTHONUNBUFFERED = '1'

$port = 8282
if (-not [string]::IsNullOrWhiteSpace($PortArg)) {
  $port = [int]$PortArg
}

function Test-PortInUse {
  param([int]$Port)
  try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
    $listener.Start()
    $listener.Stop()
    return $false
  } catch {
    return $true
  }
}

if (Test-PortInUse -Port $port) {
  if ([string]::IsNullOrWhiteSpace($PortArg)) {
    Write-Host "Port $port is already in use. Trying 8283 instead."
    $port = 8283
    if (Test-PortInUse -Port $port) {
      Write-Host "Port 8283 is also in use."
      Write-Host "Run start_server.bat 8284 or stop the process using those ports."
      exit 1
    }
  } else {
    Write-Host "Port $port is already in use."
    Write-Host "Run stop_server.bat $port or choose another port, for example:"
    Write-Host "start_server.bat 8283"
    exit 1
  }
}

$logFile = Join-Path $PSScriptRoot 'server_start.log'
Set-Content -Path $logFile -Value "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] start_server.ps1 launched on port $port" -Encoding utf8

$pythonCmd = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCmd) {
  $pythonCmd = Get-Command py -ErrorAction SilentlyContinue
  if (-not $pythonCmd) {
    Write-Host 'Python 3 was not found.'
    Write-Host 'Install it from https://www.python.org/downloads/ and run this file again.'
    exit 1
  }
}

Write-Host '=== 더치페이 서버 ==='
Write-Host ''
Write-Host "브라우저에서 열리는 중: http://localhost:$port"
Write-Host '같은 Wi-Fi의 다른 기기는 아래 Network URL을 사용하세요.'
Write-Host ''

Start-Process "http://localhost:$port"

& $pythonCmd.Source "$PSScriptRoot\server.py" $port 2>&1 | Tee-Object -FilePath $logFile -Append
$serverExit = $LASTEXITCODE

Write-Host ''
Write-Host "Server exited with code $serverExit."
Write-Host "Log file: $logFile"
Write-Host ''
Write-Host 'Server stopped.'
