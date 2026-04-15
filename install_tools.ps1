# Experiment 9 Tool Installer (Windows)
# This script installs the AWS CLI for the current user (no admin required).

Write-Host "Starting environment setup..."

# 1. Install AWS CLI (Non-Admin Method)
if (!(Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Host "Downloading AWS CLI MSI..."
    $msiPath = "$env:TEMP\AWSCLIV2.msi"
    $installDir = "$HOME\aws-cli"
    Invoke-WebRequest -Uri "https://awscli.amazonaws.com/AWSCLIV2.msi" -OutFile $msiPath
    
    Write-Host "Extracting AWS CLI (No Admin required)..."
    if (!(Test-Path $installDir)) { New-Item -ItemType Directory -Path $installDir }
    Start-Process msiexec.exe -ArgumentList "/a `"$msiPath`" /qb TARGETDIR=`"$installDir`"" -Wait
    
    # Set User Path
    $awsBin = Join-Path $installDir "Amazon\AWSCLIV2"
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($currentPath -notlike "*$awsBin*") {
        # Using simple string concatenation for safety
        $newPath = $currentPath + ";" + $awsBin
        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
        $env:Path = $env:Path + ";" + $awsBin
    }
    
    Write-Host "AWS CLI extracted to $awsBin"
    Write-Host "Please restart your terminal session to recognize the 'aws' command."
} else {
    Write-Host "AWS CLI is already installed."
}

# 2. Docker Desktop Check
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker not found. Docker Desktop requires a manual install on Windows."
    Write-Host "Download: https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
} else {
    Write-Host "Docker is already installed."
}

Write-Host "Setup steps complete. Run 'aws configure' to link your account."
