@echo off
cls

SET mypath=%~dp0

start /min cmd /k "%mypath%server/run-server.bat"
start /min cmd /k "%mypath%server/tunnel-server.bat"
