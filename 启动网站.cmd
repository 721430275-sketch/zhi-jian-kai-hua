@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo 未找到 Node.js。请先安装 Node.js，再重新双击此文件。
  pause
  exit /b 1
)

set "PORT=5184"
netstat -ano | findstr /r /c:":%PORT% .*LISTENING" >nul
if errorlevel 1 (
  start "指尖开花第二版服务" /min cmd /k "cd /d \"%~dp0\" && node serve.mjs"
  timeout /t 1 /nobreak >nul
)

start "" "http://127.0.0.1:%PORT%/"
echo 网站已打开：http://127.0.0.1:%PORT%/
endlocal
