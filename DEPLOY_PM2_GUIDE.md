# 🚀 Complete PM2 Deployment Guide for AI Trading Platform

## Server Details
- **Server IP**: http://198.38.83.152:3005/
- **Port**: 3005
- **Database**: goldengod_trading_db
- **MySQL User**: root

---

## 📋 Complete Deployment Steps

### **STEP 1: Create .env File Locally**

Run this command in PowerShell (in the `ai-trading-platform` folder):

```powershell
cd "C:\python\MG AI\ai-trading-platform"

@"
DATABASE_URL=mysql://root:32yO97aldFvo0idG@localhost:3306/goldengod_trading_db
NEXTAUTH_SECRET=ai-trading-platform-super-secret-key-2024-mgai
NEXTAUTH_URL=http://198.38.83.152:3005
NODE_ENV=production
PORT=3005
PYTHON_API_URL=http://localhost:5000
"@ | Out-File -FilePath ".env" -Encoding UTF8
```

Verify the file was created:
```powershell
cat .env
```

---

### **STEP 2: Initialize Git (if not already done)**

```powershell
cd "C:\python\MG AI\ai-trading-platform"

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - AI Trading Platform with MySQL database"
```

---

### **STEP 3: Push to GitHub**

#### Option A: Create New Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `ai-trading-platform`
3. Make it **Private**
4. Don't initialize with README (we already have one)
5. Click "Create repository"

Then run these commands:

```powershell
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ai-trading-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Option B: If Repository Already Exists

```powershell
# Add remote if not added
git remote add origin https://github.com/YOUR_USERNAME/ai-trading-platform.git

# Push
git add .
git commit -m "Update: Ready for PM2 deployment with MySQL"
git push -u origin main
```

---

### **STEP 4: Connect to Your Server via SSH**

```powershell
# Connect to your server
ssh root@198.38.83.152
```

Enter your server password when prompted.

---

### **STEP 5: Server Setup - Install Required Software**

Once logged into the server, run these commands:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18.x (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Verify Node.js and npm
node -v  # Should be v18.x.x or higher
npm -v

# Install PM2 globally
npm install -g pm2

# Install Git (if not installed)
apt install -y git

# Verify installations
pm2 -v
git --version
```

---

### **STEP 6: Clone Your Repository on the Server**

```bash
# Go to root directory
cd /root

# Clone your repository (replace YOUR_USERNAME)
git clone https://github.com/YOUR_USERNAME/ai-trading-platform.git

# Enter the project directory
cd ai-trading-platform

# Verify files are there
ls -la
```

---

### **STEP 7: Create .env File on Server**

```bash
cd /root/ai-trading-platform

# Create .env file with your configuration
cat > .env << 'EOF'
DATABASE_URL=mysql://root:32yO97aldFvo0idG@localhost:3306/goldengod_trading_db
NEXTAUTH_SECRET=ai-trading-platform-super-secret-key-2024-mgai
NEXTAUTH_URL=http://198.38.83.152:3005
NODE_ENV=production
PORT=3005
PYTHON_API_URL=http://localhost:5000
EOF

# Verify .env was created
cat .env
```

---

### **STEP 8: Install Dependencies**

```bash
cd /root/ai-trading-platform

# Install production dependencies
npm ci --production

# This will take a few minutes...
```

---

### **STEP 9: Setup Database with Prisma**

```bash
cd /root/ai-trading-platform

# Generate Prisma Client
npx prisma generate

# Push database schema to MySQL
npx prisma db push

# You should see: "Your database is now in sync with your schema."
```

---

### **STEP 10: Build the Next.js Application**

```bash
cd /root/ai-trading-platform

# Build the production version
npm run build

# This will take 2-5 minutes...
# You should see: "Compiled successfully"
```

---

### **STEP 11: Start with PM2**

```bash
cd /root/ai-trading-platform

# Create logs directory
mkdir -p logs

# Start the application with PM2
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs ai-trading-platform --lines 50
```

---

### **STEP 12: Configure PM2 to Start on Boot**

```bash
# Save PM2 process list
pm2 save

# Generate startup script
pm2 startup

# Copy and run the command it gives you (it will look like):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root
```

---

### **STEP 13: Test Your Application**

Open your browser and visit:
```
http://198.38.83.152:3005
```

You should see your AI Trading Platform! 🎉

---

## 📊 PM2 Management Commands

### View Application Status
```bash
pm2 status
```

### View Logs
```bash
# Real-time logs
pm2 logs ai-trading-platform

# Last 100 lines
pm2 logs ai-trading-platform --lines 100

# Error logs only
pm2 logs ai-trading-platform --err
```

### Restart Application
```bash
pm2 restart ai-trading-platform
```

### Stop Application
```bash
pm2 stop ai-trading-platform
```

### Delete Application from PM2
```bash
pm2 delete ai-trading-platform
```

### Monitor Resources
```bash
pm2 monit
```

### View Detailed Info
```bash
pm2 show ai-trading-platform
```

---

## 🔄 Update Deployment (After Making Changes)

### On Your Local Machine:
```powershell
cd "C:\python\MG AI\ai-trading-platform"

# Make your changes...

# Commit and push
git add .
git commit -m "Your update message"
git push
```

### On Your Server:
```bash
cd /root/ai-trading-platform

# Pull latest changes
git pull

# Install any new dependencies
npm ci --production

# Rebuild Prisma client (if schema changed)
npx prisma generate
npx prisma db push

# Rebuild application
npm run build

# Restart PM2
pm2 restart ai-trading-platform

# Check logs
pm2 logs ai-trading-platform --lines 50
```

---

## 🔥 Firewall Configuration

Make sure port 3005 is open:

```bash
# Check if firewall is active
ufw status

# If firewall is active, allow port 3005
ufw allow 3005/tcp
ufw reload

# Verify
ufw status
```

---

## 🐛 Troubleshooting

### Application Not Starting

```bash
# Check PM2 logs
pm2 logs ai-trading-platform --err

# Check if port is already in use
netstat -tulpn | grep 3005

# Kill process using port 3005 (if needed)
kill -9 $(lsof -t -i:3005)

# Restart PM2
pm2 restart ai-trading-platform
```

### Database Connection Error

```bash
# Test MySQL connection
mysql -u root -p

# Once in MySQL console:
USE goldengod_trading_db;
SHOW TABLES;
EXIT;

# If database doesn't exist, create it:
mysql -u root -p -e "CREATE DATABASE goldengod_trading_db;"

# Then re-run Prisma push
cd /root/ai-trading-platform
npx prisma db push
```

### Build Errors

```bash
# Clean build
cd /root/ai-trading-platform
rm -rf .next
rm -rf node_modules
npm ci --production
npm run build
```

### Out of Memory

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

## 📱 Access Your Platform

### From Computer:
```
http://198.38.83.152:3005
```

### From Mobile:
```
http://198.38.83.152:3005
```

### From Anywhere:
```
http://198.38.83.152:3005
```

---

## ✅ Deployment Checklist

- [ ] Created .env file locally
- [ ] Initialized Git repository
- [ ] Pushed to GitHub
- [ ] Connected to server via SSH
- [ ] Installed Node.js and PM2 on server
- [ ] Cloned repository on server
- [ ] Created .env file on server
- [ ] Installed dependencies (`npm ci --production`)
- [ ] Generated Prisma client (`npx prisma generate`)
- [ ] Pushed database schema (`npx prisma db push`)
- [ ] Built application (`npm run build`)
- [ ] Started with PM2 (`pm2 start ecosystem.config.js`)
- [ ] Configured PM2 startup (`pm2 startup` and `pm2 save`)
- [ ] Opened port 3005 in firewall
- [ ] Tested in browser (http://198.38.83.152:3005)

---

## 🎉 Success!

Your AI Trading Platform is now:
- ✅ Running on PM2
- ✅ Accessible at http://198.38.83.152:3005
- ✅ Auto-restart on crash
- ✅ Auto-start on server reboot
- ✅ Connected to MySQL database

**Happy Trading! 📈💰**

