@echo off
cls

SET mypath=%~dp0
cd "%mypath%"
ngrok.exe http 8080
