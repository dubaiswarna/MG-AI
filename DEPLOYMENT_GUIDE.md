# 🚀 AI Trading Platform - Deployment Guide

## Complete Deployment to OVIPanel Server

### Server Details
```
Server IP: 198.38.83.152
Panel URL: http://198.38.83.152:2086/
Username: zadmin
Password: EgPCo20SOcc8E9GA
```

### Access URLs
```
Development: http://localhost:3000
Production:  http://198.38.83.152:3000
Future:      https://yourdomain.com
```

---

## 📋 Pre-Deployment Checklist

### 1. Local Setup (On Your Computer)
```bash
# Navigate to project
cd C:\python\MG AI\ai-trading-platform

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your settings

# Generate Prisma client
npx prisma generate

# Build project
npm run build

# Test locally
npm run dev
```

### 2. Server Requirements
- ✅ Node.js 18+ 
- ✅ MySQL 8.0+
- ✅ Python 3.8+ (for AI models)
- ✅ 2GB RAM minimum
- ✅ 10GB disk space

---

## 🗄️ Database Setup

### Step 1: Create MySQL Database on OVIPanel

1. Login to OVIPanel: http://198.38.83.152:2086/
2. Go to **"MySQL Databases"**
3. Create new database:
   - Database name: `trading_platform_db`
   - Username: `trading_user`
   - Password: (generate strong password)
   - Grant ALL privileges

### Step 2: Import Database Schema

```bash
# From your local machine, connect to server
# Update DATABASE_URL in .env with server MySQL details

DATABASE_URL="mysql://trading_user:PASSWORD@198.38.83.152:3306/trading_platform_db"

# Push schema to database
npx prisma db push

# Or use migrations
npx prisma migrate deploy
```

### Step 3: Verify Database

```bash
# Open Prisma Studio to view database
npx prisma studio
```

---

## 📦 Upload to Server

### Method 1: FTP Upload (Easiest)

1. Open FileZilla or WinSCP
2. Connect to server:
   ```
   Host: 198.38.83.152
   Username: zadmin
   Password: EgPCo20SOcc8E9GA
   Port: 21 (FTP) or 22 (SFTP)
   ```

3. Upload entire `ai-trading-platform` folder to:
   ```
   /home/zadmin/ai-trading-platform/
   ```

4. Exclude these folders (don't upload):
   - `node_modules/`
   - `.next/`
   - `.git/`

### Method 2: SSH + Git (Professional)

```bash
# SSH into server
ssh zadmin@198.38.83.152

# Clone from GitHub
cd /home/zadmin/
git clone https://github.com/YOUR_USERNAME/ai-trading-platform.git
cd ai-trading-platform

# Install dependencies
npm ci --production

# Setup environment
nano .env.local
# Add production environment variables

# Generate Prisma client
npx prisma generate

# Build application
npm run build
```

---

## 🔧 Server Configuration

### Step 1: Install Node.js (if not installed)

```bash
# SSH into server
ssh zadmin@198.38.83.152

# Check Node.js version
node --version

# If not installed or old version, install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should be v18.x.x
npm --version
```

### Step 2: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify
pm2 --version
```

### Step 3: Setup Python API (for AI Models)

```bash
# Navigate to python-api folder
cd /home/zadmin/ai-trading-platform/python-api

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install flask flask-cors numpy pandas scikit-learn xgboost

# Copy your AI models
# Upload your .pkl model files to:
# /home/zadmin/ai-trading-platform/python-api/models/

# Start Python API
pm2 start python_api.py --name "ai-models-api" --interpreter python3
pm2 save
```

---

## 🚀 Start Application

### Option 1: Using PM2 (Recommended)

```bash
cd /home/zadmin/ai-trading-platform

# Start Next.js application
pm2 start npm --name "trading-platform" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
# Follow the command it gives you

# View application status
pm2 status

# View logs
pm2 logs trading-platform
```

### Option 2: Manual Start

```bash
cd /home/zadmin/ai-trading-platform
npm run start
```

---

## 🌐 Configure Firewall & Ports

```bash
# Allow port 3000 (Next.js)
sudo ufw allow 3000/tcp

# Allow port 5000 (Python API)
sudo ufw allow 5000/tcp

# Check firewall status
sudo ufw status
```

---

## 🔗 Access Your Platform

### Via IP Address
```
http://198.38.83.152:3000
```

### Setup Reverse Proxy (Optional)

Create Nginx configuration:

```nginx
server {
    listen 80;
    server_name 198.38.83.152;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Now access at: `http://198.38.83.152`

---

## 🔐 SSL Certificate (When You Get Domain)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal (certbot handles this automatically)
sudo certbot renew --dry-run
```

---

## 📊 Environment Variables (Production)

Create `.env.local` on server:

```env
# Database
DATABASE_URL="mysql://trading_user:YOUR_PASSWORD@localhost:3306/trading_platform_db"

# NextAuth
NEXTAUTH_SECRET="generate-random-32-char-string"
NEXTAUTH_URL="http://198.38.83.152:3000"

# Server
NODE_ENV="production"
PORT=3000

# Python API
PYTHON_API_URL="http://localhost:5000"

# Optional
DHAN_API_KEY=""
DHAN_CLIENT_ID=""
```

---

## 🧪 Testing Deployment

### 1. Check Application Running
```bash
pm2 status
pm2 logs trading-platform
```

### 2. Test in Browser
```
http://198.38.83.152:3000
```

### 3. Test API Endpoints
```bash
# Health check
curl http://198.38.83.152:3000/api/health

# Test auth
curl http://198.38.83.152:3000/api/auth/session
```

### 4. Test Database Connection
```bash
# SSH into server
cd /home/zadmin/ai-trading-platform
npx prisma studio
# Opens database viewer
```

---

## 🔄 Update/Redeploy

```bash
# SSH into server
ssh zadmin@198.38.83.152
cd /home/zadmin/ai-trading-platform

# Pull latest code
git pull origin main

# Install new dependencies
npm ci --production

# Rebuild
npm run build

# Restart application
pm2 restart trading-platform

# Check logs
pm2 logs trading-platform
```

---

## 🐛 Troubleshooting

### Application Not Starting
```bash
# Check PM2 logs
pm2 logs trading-platform --lines 100

# Check if port is in use
sudo lsof -i :3000

# Restart PM2
pm2 restart trading-platform
```

### Database Connection Error
```bash
# Check MySQL is running
sudo systemctl status mysql

# Test MySQL connection
mysql -u trading_user -p trading_platform_db

# Check database URL in .env.local
cat .env.local | grep DATABASE_URL
```

### Python API Not Working
```bash
# Check Python API status
pm2 logs ai-models-api

# Restart Python API
pm2 restart ai-models-api

# Test Python API
curl http://localhost:5000/health
```

---

## 📈 Monitoring

### PM2 Monitoring
```bash
# Real-time monitoring
pm2 monit

# Status
pm2 status

# Logs
pm2 logs

# CPU/Memory usage
pm2 list
```

### Database Monitoring
```bash
# MySQL status
sudo systemctl status mysql

# Check connections
mysql -u root -p -e "SHOW PROCESSLIST;"

# Check database size
mysql -u root -p -e "SELECT table_schema AS 'Database', ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)' FROM information_schema.TABLES GROUP BY table_schema;"
```

---

## 🎯 Performance Optimization

### 1. Enable Caching
- Configure Redis (optional)
- Use Next.js static generation

### 2. Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_positions_user_symbol ON positions(userId, symbol);
CREATE INDEX idx_signals_confidence ON signals(hybridConfidence);
CREATE INDEX idx_trades_user_date ON trade_history(userId, exitDate);
```

### 3. PM2 Cluster Mode
```bash
# Use multiple CPU cores
pm2 start npm --name "trading-platform" -i max -- start
```

---

## 📱 Mobile Access

Your platform is **fully responsive** and works on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones
- ✅ Any device with a web browser

Access from anywhere: `http://198.38.83.152:3000`

---

## 🔒 Security Checklist

- ✅ Change default passwords
- ✅ Use strong database password
- ✅ Generate secure NEXTAUTH_SECRET
- ✅ Enable firewall (UFW)
- ✅ Regular backups
- ✅ Update Node.js/packages regularly
- ✅ Monitor logs for suspicious activity
- ✅ Setup SSL when domain is ready

---

## 📞 Quick Commands Reference

```bash
# Start application
pm2 start trading-platform

# Stop application
pm2 stop trading-platform

# Restart application
pm2 restart trading-platform

# View logs
pm2 logs trading-platform

# Application status
pm2 status

# Database viewer
npx prisma studio

# Update code
git pull && npm ci --production && npm run build && pm2 restart trading-platform
```

---

## ✅ Deployment Checklist

- [ ] Node.js 18+ installed
- [ ] MySQL database created
- [ ] Database schema imported
- [ ] Code uploaded to server
- [ ] Dependencies installed (`npm ci`)
- [ ] Environment variables configured
- [ ] Prisma client generated
- [ ] Application built (`npm run build`)
- [ ] PM2 installed and configured
- [ ] Application started with PM2
- [ ] Firewall ports opened
- [ ] Python API running
- [ ] Tested in browser
- [ ] API endpoints working
- [ ] Database connection verified

---

## 🎉 You're Live!

Once deployed, your platform will be accessible at:
```
http://198.38.83.152:3000
```

**From ANY device, ANYWHERE in the world!** 🌍🚀

---

**Need help? Refer to the troubleshooting section or check PM2 logs!**

