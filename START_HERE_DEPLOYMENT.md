# 🚀 START HERE - Complete PM2 Deployment Guide

## 📍 Your Server Information

- **Server IP**: `http://198.38.83.152:3005/`
- **Port**: `3005`
- **Database**: `goldengod_trading_db` ✅ (Already created and moved)
- **Database User**: `root`

---

## 🎯 Quick Start - Choose Your Method

### **METHOD 1: Automated Script (Recommended)** ⚡

**On Windows (PowerShell):**

```powershell
cd "C:\python\MG AI\ai-trading-platform"
.\deploy-local.ps1
```

This script will:
- ✅ Create .env file automatically
- ✅ Initialize Git
- ✅ Commit all files
- ✅ Push to GitHub
- ✅ Give you exact server commands

---

### **METHOD 2: Manual Commands** 📝

If you prefer to run commands manually, follow the **QUICK_DEPLOY_COMMANDS.txt** file.

---

## 📚 Available Documentation

| File | Purpose |
|------|---------|
| **START_HERE_DEPLOYMENT.md** | This file - quick overview |
| **QUICK_DEPLOY_COMMANDS.txt** | Copy-paste commands (fastest) |
| **DEPLOY_PM2_GUIDE.md** | Complete detailed guide |
| **deploy-local.ps1** | Automated Windows script |
| **deploy-server.sh** | Automated server script |
| **ecosystem.config.js** | PM2 configuration |

---

## 🚦 Deployment Process Overview

### **Phase 1: Local Setup** (Your Windows PC)

1. ✅ Create `.env` file with database credentials
2. ✅ Initialize Git repository
3. ✅ Commit all files
4. ✅ Create GitHub repository
5. ✅ Push code to GitHub

### **Phase 2: Server Setup** (Your Linux Server)

1. ✅ Install Node.js, PM2, Git
2. ✅ Clone repository from GitHub
3. ✅ Create `.env` file on server
4. ✅ Install dependencies
5. ✅ Setup database with Prisma
6. ✅ Build Next.js application
7. ✅ Start with PM2
8. ✅ Configure auto-start
9. ✅ Open firewall port

### **Phase 3: Testing**

1. ✅ Access `http://198.38.83.152:3005`
2. ✅ Verify application loads
3. ✅ Test login/register
4. ✅ Check database connection

---

## ⚡ Ultra-Quick Start (3 Steps)

### **STEP 1: Run on Windows**

```powershell
cd "C:\python\MG AI\ai-trading-platform"
.\deploy-local.ps1
```

### **STEP 2: Connect to Server**

```bash
ssh root@198.38.83.152
```

### **STEP 3: Run on Server**

```bash
# Download and run the deployment script
cd /root
git clone https://github.com/YOUR_USERNAME/ai-trading-platform.git
cd ai-trading-platform
chmod +x deploy-server.sh
./deploy-server.sh
```

**Done!** 🎉 Your app is live at `http://198.38.83.152:3005`

---

## 🔑 Environment Variables (.env)

Your `.env` file contains:

```env
DATABASE_URL=mysql://root:32yO97aldFvo0idG@localhost:3306/goldengod_trading_db
NEXTAUTH_SECRET=ai-trading-platform-super-secret-key-2024-mgai
NEXTAUTH_URL=http://198.38.83.152:3005
NODE_ENV=production
PORT=3005
PYTHON_API_URL=http://localhost:5000
```

**Important**: Create this file BOTH on Windows and on Server!

---

## 📊 PM2 Management Cheat Sheet

### Basic Commands

```bash
# Check status
pm2 status

# View logs (real-time)
pm2 logs ai-trading-platform

# View last 100 lines
pm2 logs ai-trading-platform --lines 100

# Restart application
pm2 restart ai-trading-platform

# Stop application
pm2 stop ai-trading-platform

# Monitor CPU/Memory
pm2 monit

# Detailed info
pm2 show ai-trading-platform
```

### Update Deployment

```bash
cd /root/ai-trading-platform
git pull
npm ci --production
npx prisma generate
npx prisma db push
npm run build
pm2 restart ai-trading-platform
```

---

## 🐛 Troubleshooting

### Problem: Application not starting

```bash
# Check error logs
pm2 logs ai-trading-platform --err

# Check if port is in use
netstat -tulpn | grep 3005

# Kill process on port (if needed)
kill -9 $(lsof -t -i:3005)

# Restart PM2
pm2 restart ai-trading-platform
```

### Problem: Database connection error

```bash
# Test MySQL connection
mysql -u root -p
# Enter password: 32yO97aldFvo0idG

# Inside MySQL:
USE goldengod_trading_db;
SHOW TABLES;
EXIT;

# Re-run Prisma setup
cd /root/ai-trading-platform
npx prisma generate
npx prisma db push
```

### Problem: Build errors

```bash
# Clean rebuild
cd /root/ai-trading-platform
rm -rf .next node_modules
npm ci --production
npm run build
pm2 restart ai-trading-platform
```

### Problem: Out of memory during build

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Problem: Port 3005 not accessible

```bash
# Check firewall
ufw status

# Allow port 3005
ufw allow 3005/tcp
ufw reload

# Check if app is listening
netstat -tulpn | grep 3005
```

---

## ✅ Pre-Deployment Checklist

### Before Starting:

- [ ] Database `goldengod_trading_db` is created ✅ (You said done)
- [ ] You have GitHub account
- [ ] You have SSH access to server (root@198.38.83.152)
- [ ] Server is running and accessible

### After Deployment:

- [ ] .env file created locally
- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Server has Node.js and PM2 installed
- [ ] Repository cloned on server
- [ ] .env file created on server
- [ ] Dependencies installed
- [ ] Database schema pushed with Prisma
- [ ] Application built successfully
- [ ] PM2 running the application
- [ ] Port 3005 is open in firewall
- [ ] Application accessible in browser
- [ ] Login/Register works
- [ ] Database connection verified

---

## 🎯 Expected Outcome

After successful deployment:

1. ✅ Application running on PM2
2. ✅ Accessible at `http://198.38.83.152:3005`
3. ✅ Auto-restart on crash
4. ✅ Auto-start on server reboot
5. ✅ Database connected and working
6. ✅ Can register/login users
7. ✅ All features functional

---

## 📞 Need Help?

### Check These Files:

1. **QUICK_DEPLOY_COMMANDS.txt** - All commands in one place
2. **DEPLOY_PM2_GUIDE.md** - Detailed step-by-step guide
3. **ecosystem.config.js** - PM2 configuration
4. **prisma/schema.prisma** - Database schema

### Common Issues:

- **"npm ci" fails** → Make sure `package-lock.json` exists
- **"prisma db push" fails** → Check DATABASE_URL in .env
- **"npm run build" fails** → Check for syntax errors, try clean build
- **"Cannot GET /"** → Application started but Next.js routing issue
- **Connection refused** → Check if PM2 is running, check firewall

---

## 🚀 Ready to Deploy?

### Quick Command Summary:

**Windows:**
```powershell
cd "C:\python\MG AI\ai-trading-platform"
.\deploy-local.ps1
```

**Server:**
```bash
ssh root@198.38.83.152
cd /root
git clone https://github.com/YOUR_USERNAME/ai-trading-platform.git
cd ai-trading-platform
chmod +x deploy-server.sh
./deploy-server.sh
```

**Test:**
```
http://198.38.83.152:3005
```

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ `pm2 status` shows "online" status
2. ✅ `pm2 logs` shows "Ready on http://0.0.0.0:3005"
3. ✅ Browser opens the login page
4. ✅ Can register a new user
5. ✅ Can login successfully
6. ✅ Dashboard loads with data

---

## 📈 Next Steps After Deployment

1. **Register Admin User**
   - Go to `http://198.38.83.152:3005/register`
   - Create your admin account

2. **Test Features**
   - Generate signals
   - View portfolio
   - Check trade history
   - Test all pages

3. **Monitor Logs**
   - `pm2 logs ai-trading-platform`
   - Watch for errors

4. **Backup Configuration**
   - Save your `.env` file securely
   - Document your GitHub repository

5. **Setup Monitoring**
   - `pm2 monit` for real-time monitoring
   - Set up alerts if needed

---

## 🔒 Security Notes

- ✅ `.env` file is in `.gitignore` (passwords not in GitHub)
- ✅ Database password is strong
- ✅ NextAuth secret is configured
- ⚠️ **TODO**: Add SSL certificate for HTTPS (later)
- ⚠️ **TODO**: Setup domain name (optional)

---

## 📝 Important Notes

1. **Database**: Already created ✅
2. **Port**: Using 3005 (not 3000)
3. **Environment**: Production mode
4. **Process Manager**: PM2 (not npm directly)
5. **Auto-restart**: Enabled
6. **Logs**: Saved in `logs/` directory

---

## 🎯 Your Action Plan

1. **Right now**: Run `.\deploy-local.ps1` on Windows
2. **Next**: SSH to server and run deployment script
3. **Then**: Test in browser
4. **Finally**: Start using your platform!

---

# 🚀 LET'S DO THIS!

**Start with:**
```powershell
cd "C:\python\MG AI\ai-trading-platform"
.\deploy-local.ps1
```

**Questions? Check:**
- QUICK_DEPLOY_COMMANDS.txt
- DEPLOY_PM2_GUIDE.md

---

**Built with ❤️ for Professional Trading**

🎉 **Happy Trading! 📈💰**

