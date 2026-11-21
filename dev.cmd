@echo off
rem Menjalankan server pengembangan dari folder tempat berkas ini disimpan.
setlocal
cd /d "%~dp0"
rem Mencari instalasi mise melalui WinGet sebelum mencoba perintah dari PATH.
set "PORTFOLIO_MISE=%LOCALAPPDATA%\Microsoft\WinGet\Packages\jdx.mise_Microsoft.Winget.Source_8wekyb3d8bbwe\mise\bin\mise.exe"
if exist "%PORTFOLIO_MISE%" (
  "%PORTFOLIO_MISE%" run dev
) else (
  mise run dev
)
rem Mengembalikan status proses agar kegagalan dapat dikenali oleh terminal.
exit /b %errorlevel%
