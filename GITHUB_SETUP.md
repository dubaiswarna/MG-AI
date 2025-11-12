# 🐙 GitHub Setup Guide

## Setup GitHub Repository for AI Trading Platform

### Your GitHub Details
```
Email: dubaiswarna@gmail.com
Password: VGmma@143$
```

---

## 🚀 STEP-BY-STEP SETUP

### Step 1: Login to GitHub

1. Go to: https://github.com
2. Click **"Sign in"**
3. Enter:
   - Email: `dubaiswarna@gmail.com`
   - Password: `VGmma@143$`
4. Click **"Sign in"**

---

### Step 2: Create New Repository

1. Click the **"+"** icon (top right)
2. Select **"New repository"**

3. Fill in details:
   ```
   Repository name: ai-trading-platform
   Description: AI-Powered Multi-User Trading Platform with Next.js & MySQL
   Privacy: ⚫ Private (Recommended) - Only you can see it
             ⚪ Public - Everyone can see it
   
   ☑️ Add a README file
   ☐ Add .gitignore (we already have one)
   ☐ Choose a license
   ```

4. Click **"Create repository"**

---

### Step 3: Get Repository URL

After creating, you'll see:
```
https://github.com/dubaiswarna/ai-trading-platform.git
```

Copy this URL!

---

### Step 4: Initialize Git Locally (On Your Computer)

Open Command Prompt/PowerShell:

```bash
# Navigate to project
cd "C:\python\MG AI\ai-trading-platform"

# Initialize git (if not already)
git init

# Configure git with your details
git config user.name "Dubai Swarna"
git config user.email "dubaiswarna@gmail.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: AI Trading Platform with Next.js & MySQL"

# Add remote repository
git remote add origin https://github.com/dubaiswarna/ai-trading-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 5: Enter GitHub Credentials

When prompted:
```
Username: dubaiswarna@gmail.com
Password: VGmma@143$
```

Or use **Personal Access Token** (more secure):

#### Create Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Note: `AI Trading Platform Access`
4. Select scopes:
   - ✅ repo (full control)
   - ✅ workflow
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. Use token as password when git asks

---

### Step 6: Verify Upload

1. Go to: https://github.com/dubaiswarna/ai-trading-platform
2. You should see all your files!

---

## 🔄 Daily Git Workflow

### Making Changes and Pushing

```bash
# After making changes to code
cd "C:\python\MG AI\ai-trading-platform"

# Check what changed
git status

# Add changed files
git add .

# Commit changes
git commit -m "Description of what you changed"

# Push to GitHub
git push

# Or push specific branch
git push origin main
```

---

## 📥 Pull Latest Code (On Server or Other Computer)

```bash
# Navigate to project
cd /home/zadmin/ai-trading-platform

# Pull latest changes
git pull origin main

# Install any new dependencies
npm ci --production

# Rebuild
npm run build

# Restart application
pm2 restart trading-platform
```

---

## 🌿 Branching Strategy

### Create Feature Branch
```bash
# Create and switch to new branch
git checkout -b feature/new-dashboard

# Make changes, then commit
git add .
git commit -m "Add new dashboard feature"

# Push branch to GitHub
git push origin feature/new-dashboard

# Merge to main when ready
git checkout main
git merge feature/new-dashboard
git push origin main
```

---

## 🔒 .gitignore (Already Created)

These files/folders are **NOT** uploaded to GitHub:
```
node_modules/        # Dependencies (large)
.next/              # Build files
.env.local          # Secrets/passwords
*.log               # Log files
.DS_Store           # Mac files
```

**Important:** `.env.local` with passwords is NOT uploaded! ✅

---

## 👥 Collaboration (If Adding Team Members)

### Invite Collaborators:
1. Go to repository: https://github.com/dubaiswarna/ai-trading-platform
2. Click **"Settings"** → **"Collaborators"**
3. Click **"Add people"**
4. Enter their GitHub username or email
5. They get access!

---

## 📦 GitHub Actions (CI/CD) - Optional

Create `.github/workflows/deploy.yml` for auto-deployment:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Server
      uses: appleboy/ssh-action@master
      with:
        host: 198.38.83.152
        username: zadmin
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /home/zadmin/ai-trading-platform
          git pull origin main
          npm ci --production
          npm run build
          pm2 restart trading-platform
```

---

## 🐛 Common Git Issues & Solutions

### Issue: "Permission denied"
```bash
# Use personal access token instead of password
# Or setup SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

### Issue: "Repository not found"
```bash
# Check repository URL
git remote -v

# Update if wrong
git remote set-url origin https://github.com/dubaiswarna/ai-trading-platform.git
```

### Issue: "Merge conflict"
```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts in files
# Then commit
git add .
git commit -m "Resolved merge conflicts"
git push
```

### Issue: "Large file warning"
```bash
# Don't commit large files
# Add to .gitignore:
echo "*.pkl" >> .gitignore
echo "*.csv" >> .gitignore
git add .gitignore
git commit -m "Update gitignore"
```

---

## 📊 Repository Settings

### Recommended Settings:

1. **Security:**
   - Enable **2-factor authentication** (2FA)
   - Use **personal access tokens**
   - Make repository **private**

2. **Branches:**
   - Protect `main` branch
   - Require pull request reviews
   - Enable status checks

3. **Webhooks:**
   - Add webhook for auto-deployment
   - Integrate with Discord/Slack for notifications

---

## 🎯 Quick Commands Reference

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest
git pull

# View history
git log

# View remote URL
git remote -v

# Create branch
git checkout -b branch-name

# Switch branch
git checkout main

# Delete local branch
git branch -d branch-name

# View all branches
git branch -a
```

---

## ✅ GitHub Setup Checklist

- [ ] GitHub account login verified
- [ ] Repository created (ai-trading-platform)
- [ ] Repository is private
- [ ] Git configured locally
- [ ] Initial commit pushed
- [ ] Repository accessible online
- [ ] .gitignore working (secrets not uploaded)
- [ ] Personal access token created (optional)
- [ ] 2FA enabled (recommended)
- [ ] README.md updated

---

## 🌐 Your Repository URL

```
https://github.com/dubaiswarna/ai-trading-platform
```

**Keep this private and secure!** 🔒

---

**Need help with Git? Let me know!** 🚀

