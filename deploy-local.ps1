# ══════════════════════════════════════════════════════════════════
# 🚀 AI Trading Platform - Local Deployment Script
# ══════════════════════════════════════════════════════════════════

Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   AI Trading Platform - PM2 Deployment Setup" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Get current directory
$projectPath = "C:\python\MG AI\ai-trading-platform"
Set-Location $projectPath

Write-Host "📁 Current Directory: $projectPath" -ForegroundColor Yellow
Write-Host ""

# ══════════════════════════════════════════════════════════════════
# STEP 1: Create .env File
# ══════════════════════════════════════════════════════════════════

Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 1: Creating .env File" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan

$envContent = @"
DATABASE_URL=mysql://root:32yO97aldFvo0idG@localhost:3306/goldengod_trading_db
NEXTAUTH_SECRET=ai-trading-platform-super-secret-key-2024-mgai
NEXTAUTH_URL=http://198.38.83.152:3005
NODE_ENV=production
PORT=3005
PYTHON_API_URL=http://localhost:5000
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8 -NoNewline

if (Test-Path ".env") {
    Write-Host "✅ .env file created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📄 .env contents:" -ForegroundColor Yellow
    Get-Content ".env"
} else {
    Write-Host "❌ Failed to create .env file" -ForegroundColor Red
    exit 1
}

Write-Host ""
Read-Host "Press Enter to continue to Git setup..."

# ══════════════════════════════════════════════════════════════════
# STEP 2: Initialize Git
# ══════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 2: Initializing Git Repository" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Check if git is already initialized
if (Test-Path ".git") {
    Write-Host "⚠️  Git repository already initialized" -ForegroundColor Yellow
    $reinit = Read-Host "Do you want to reinitialize? (y/n)"
    if ($reinit -eq "y") {
        Remove-Item -Recurse -Force ".git"
        git init
        Write-Host "✅ Git reinitialized" -ForegroundColor Green
    }
} else {
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
}

Write-Host ""
Read-Host "Press Enter to continue to commit..."

# ══════════════════════════════════════════════════════════════════
# STEP 3: Add and Commit Files
# ══════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 3: Committing Files" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan

git add .
git commit -m "Initial commit - AI Trading Platform ready for PM2 deployment on port 3005"

Write-Host "✅ Files committed to git" -ForegroundColor Green
Write-Host ""

# ══════════════════════════════════════════════════════════════════
# STEP 4: GitHub Setup Instructions
# ══════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 4: GitHub Repository Setup" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Create a new repository on GitHub:" -ForegroundColor Yellow
Write-Host "   1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "   2. Repository name: ai-trading-platform" -ForegroundColor White
Write-Host "   3. Privacy: PRIVATE (recommended)" -ForegroundColor White
Write-Host "   4. Do NOT initialize with README" -ForegroundColor White
Write-Host "   5. Click 'Create repository'" -ForegroundColor White
Write-Host ""

$username = Read-Host "Enter your GitHub username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Username cannot be empty" -ForegroundColor Red
    exit 1
}

$repoUrl = "https://github.com/$username/ai-trading-platform.git"

Write-Host ""
Write-Host "📡 Setting up remote repository..." -ForegroundColor Yellow
Write-Host "Repository URL: $repoUrl" -ForegroundColor White
Write-Host ""

# ══════════════════════════════════════════════════════════════════
# STEP 5: Add Remote and Push
# ══════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 5: Pushing to GitHub" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Remove existing remote if it exists
$remotes = git remote
if ($remotes -contains "origin") {
    Write-Host "⚠️  Removing existing remote 'origin'" -ForegroundColor Yellow
    git remote remove origin
}

Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote add origin $repoUrl

Write-Host "Setting branch to main..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "   (You may need to enter your GitHub credentials)" -ForegroundColor White
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    Write-Host "   Please check your credentials and try again" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Manual push command:" -ForegroundColor Yellow
    Write-Host "   git push -u origin main" -ForegroundColor White
}

# ══════════════════════════════════════════════════════════════════
# STEP 6: Server Deployment Instructions
# ══════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 6: Deploy to Server" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps - Run these commands on your server:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Connect to server:" -ForegroundColor Cyan
Write-Host "   ssh root@198.38.83.152" -ForegroundColor White
Write-Host ""
Write-Host "2️⃣  Clone repository:" -ForegroundColor Cyan
Write-Host "   cd /root" -ForegroundColor White
Write-Host "   git clone $repoUrl" -ForegroundColor White
Write-Host "   cd ai-trading-platform" -ForegroundColor White
Write-Host ""
Write-Host "3️⃣  Create .env file on server:" -ForegroundColor Cyan
Write-Host "   cat > .env << 'EOF'" -ForegroundColor White
Write-Host "   DATABASE_URL=mysql://root:32yO97aldFvo0idG@localhost:3306/goldengod_trading_db" -ForegroundColor White
Write-Host "   NEXTAUTH_SECRET=ai-trading-platform-super-secret-key-2024-mgai" -ForegroundColor White
Write-Host "   NEXTAUTH_URL=http://198.38.83.152:3005" -ForegroundColor White
Write-Host "   NODE_ENV=production" -ForegroundColor White
Write-Host "   PORT=3005" -ForegroundColor White
Write-Host "   PYTHON_API_URL=http://localhost:5000" -ForegroundColor White
Write-Host "   EOF" -ForegroundColor White
Write-Host ""
Write-Host "4️⃣  Install & Build:" -ForegroundColor Cyan
Write-Host "   npm ci --production" -ForegroundColor White
Write-Host "   npx prisma generate" -ForegroundColor White
Write-Host "   npx prisma db push" -ForegroundColor White
Write-Host "   npm run build" -ForegroundColor White
Write-Host ""
Write-Host "5️⃣  Start with PM2:" -ForegroundColor Cyan
Write-Host "   mkdir -p logs" -ForegroundColor White
Write-Host "   pm2 start ecosystem.config.js" -ForegroundColor White
Write-Host "   pm2 save" -ForegroundColor White
Write-Host "   pm2 startup" -ForegroundColor White
Write-Host ""
Write-Host "6️⃣  Open firewall port:" -ForegroundColor Cyan
Write-Host "   ufw allow 3005/tcp" -ForegroundColor White
Write-Host ""
Write-Host "7️⃣  Test in browser:" -ForegroundColor Cyan
Write-Host "   http://198.38.83.152:3005" -ForegroundColor White
Write-Host ""

# ══════════════════════════════════════════════════════════════════
# Summary
# ══════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ LOCAL SETUP COMPLETE!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 What was done:" -ForegroundColor Yellow
Write-Host "   ✅ Created .env file with your database credentials" -ForegroundColor Green
Write-Host "   ✅ Initialized Git repository" -ForegroundColor Green
Write-Host "   ✅ Committed all files" -ForegroundColor Green
Write-Host "   ✅ Pushed to GitHub: $repoUrl" -ForegroundColor Green
Write-Host ""
Write-Host "📝 What's next:" -ForegroundColor Yellow
Write-Host "   1. Connect to your server (ssh root@198.38.83.152)" -ForegroundColor White
Write-Host "   2. Follow the deployment commands above" -ForegroundColor White
Write-Host "   3. Access your platform at http://198.38.83.152:3005" -ForegroundColor White
Write-Host ""
Write-Host "📚 Complete guide available in:" -ForegroundColor Yellow
Write-Host "   - QUICK_DEPLOY_COMMANDS.txt" -ForegroundColor White
Write-Host "   - DEPLOY_PM2_GUIDE.md" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Happy Trading! 📈💰" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to exit..."

