#!/bin/bash

# ══════════════════════════════════════════════════════════════════
# 🚀 AI Trading Platform - Server Deployment Script
# ══════════════════════════════════════════════════════════════════

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   AI Trading Platform - Server Deployment${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo ""

# ══════════════════════════════════════════════════════════════════
# Configuration
# ══════════════════════════════════════════════════════════════════

PROJECT_DIR="/root/ai-trading-platform"
APP_NAME="ai-trading-platform"
PORT=3005
GITHUB_REPO=""

# ══════════════════════════════════════════════════════════════════
# STEP 1: Install System Requirements
# ══════════════════════════════════════════════════════════════════

echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}STEP 1: Installing System Requirements${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"

echo -e "${YELLOW}Updating system packages...${NC}"
apt update && apt upgrade -y

echo -e "${YELLOW}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Installing Node.js 18.x...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt install -y nodejs
else
    echo -e "${GREEN}✅ Node.js already installed: $(node -v)${NC}"
fi

echo -e "${YELLOW}Checking npm installation...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
else
    echo -e "${GREEN}✅ npm installed: $(npm -v)${NC}"
fi

echo -e "${YELLOW}Checking PM2 installation...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    npm install -g pm2
else
    echo -e "${GREEN}✅ PM2 already installed: $(pm2 -v)${NC}"
fi

echo -e "${YELLOW}Checking Git installation...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}Installing Git...${NC}"
    apt install -y git
else
    echo -e "${GREEN}✅ Git already installed: $(git --version)${NC}"
fi

echo ""
read -p "Press Enter to continue..."

# ══════════════════════════════════════════════════════════════════
# STEP 2: Clone Repository
# ══════════════════════════════════════════════════════════════════

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}STEP 2: Cloning Repository${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"

echo -e "${YELLOW}Enter your GitHub repository URL:${NC}"
echo -e "${YELLOW}Example: https://github.com/username/ai-trading-platform.git${NC}"
read -p "URL: " GITHUB_REPO

if [ -z "$GITHUB_REPO" ]; then
    echo -e "${RED}❌ Repository URL cannot be empty${NC}"
    exit 1
fi

cd /root

if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}⚠️  Project directory already exists${NC}"
    read -p "Do you want to delete and re-clone? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        echo -e "${YELLOW}Backing up existing directory...${NC}"
        mv "$PROJECT_DIR" "${PROJECT_DIR}_backup_$(date +%Y%m%d_%H%M%S)"
        echo -e "${YELLOW}Cloning repository...${NC}"
        git clone "$GITHUB_REPO" "$PROJECT_DIR"
    else
        echo -e "${YELLOW}Using existing directory${NC}"
    fi
else
    echo -e "${YELLOW}Cloning repository...${NC}"
    git clone "$GITHUB_REPO" "$PROJECT_DIR"
fi

cd "$PROJECT_DIR"
echo -e "${GREEN}✅ Repository cloned/exists${NC}"

echo ""
read -p "Press Enter to continue..."

# ══════════════════════════════════════════════════════════════════
# STEP 3: Create .env File
# ══════════════════════════════════════════════════════════════════

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}STEP 3: Creating .env File${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"

if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
    cat .env
    read -p "Do you want to recreate it? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        echo -e "${YELLOW}Skipping .env creation${NC}"
        echo ""
        read -p "Press Enter to continue..."
        # Skip to next section
    else
        rm .env
    fi
fi

if [ ! -f ".env" ]; then
    cat > .env << 'EOF'
DATABASE_URL=mysql://root:32yO97aldFvo0idG@localhost:3306/goldengod_trading_db
NEXTAUTH_SECRET=ai-trading-platform-super-secret-key-2024-mgai
NEXTAUTH_URL=http://198.38.83.152:3005
NODE_ENV=production
PORT=3005
PYTHON_API_URL=http://localhost:5000
EOF

    echo -e "${GREEN}✅ .env file created${NC}"
    echo ""
    echo -e "${YELLOW}📄 .env contents:${NC}"
    cat .env
fi

echo ""
read -p "Press Enter to continue..."

# ══════════════════════════════════════════════════════════════════
# STEP 4: Install Dependencies
# ══════════════════════════════════════════════════════════════════

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}STEP 4: Installing Dependencies${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"

echo -e "${YELLOW}Installing npm packages... (this may take 2-3 minutes)${NC}"
npm ci --production

echo -e "${GREEN}✅ Dependencies installed${NC}"

echo ""
read -p "Press Enter to continue..."

# ══════════════════════════════════════════════════════════════════
# STEP 5: Setup Database
# ══════════════════════════════════════════════════════════════════

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}STEP 5: Setting Up Database${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"

echo -e "${YELLOW}Generating Prisma Client...${NC}"
npx prisma generate

echo -e "${YELLOW}Pushing database schema...${NC}"
npx prisma db push

echo -e "${GREEN}✅ Database setup complete${NC}"

echo ""
read -p "Press Enter to continue..."

# ══════════════════════════════════════════════════════════════════
# STEP 6: Build Application
# ══════════════════════════════════════════════════════════════════

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}STEP 6: Building Application${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"

echo -e "${YELLOW}Building Next.js application... (this may take 2-5 minutes)${NC}"
npm run build

echo -e "${GREEN}✅ Build complete${NC}"

echo ""
read -p "Press Enter to continue..."

# ══════════════════════════════════════════════════════════════════
# STEP 7: Setup PM2
# ══════════════════════════════════════════════════════════════════

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}STEP 7: Setting Up PM2${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"

# Create logs directory
mkdir -p logs

# Stop existing PM2 process if running
if pm2 describe "$APP_NAME" &> /dev/null; then
    echo -e "${YELLOW}Stopping existing PM2 process...${NC}"
    pm2 stop "$APP_NAME"
    pm2 delete "$APP_NAME"
fi

echo -e "${YELLOW}Starting application with PM2...${NC}"
pm2 start ecosystem.config.js

echo -e "${YELLOW}Saving PM2 process list...${NC}"
pm2 save

echo -e "${YELLOW}Setting up PM2 startup script...${NC}"
pm2 startup

echo -e "${GREEN}✅ PM2 setup complete${NC}"
echo ""
echo -e "${YELLOW}📋 PM2 Status:${NC}"
pm2 status

echo ""
read -p "Press Enter to continue..."

# ══════════════════════════════════════════════════════════════════
# STEP 8: Configure Firewall
# ══════════════════════════════════════════════════════════════════

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}STEP 8: Configuring Firewall${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"

if command -v ufw &> /dev/null; then
    echo -e "${YELLOW}Opening port $PORT...${NC}"
    ufw allow $PORT/tcp
    ufw reload
    echo -e "${GREEN}✅ Firewall configured${NC}"
    echo ""
    echo -e "${YELLOW}📋 Firewall Status:${NC}"
    ufw status
else
    echo -e "${YELLOW}⚠️  UFW not installed, skipping firewall configuration${NC}"
fi

echo ""
read -p "Press Enter to continue..."

# ══════════════════════════════════════════════════════════════════
# STEP 9: View Logs
# ══════════════════════════════════════════════════════════════════

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}STEP 9: Application Logs${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"

echo -e "${YELLOW}📋 Last 50 lines of application logs:${NC}"
pm2 logs "$APP_NAME" --lines 50 --nostream

echo ""

# ══════════════════════════════════════════════════════════════════
# Summary
# ══════════════════════════════════════════════════════════════════

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📋 Deployment Summary:${NC}"
echo -e "${GREEN}   ✅ System requirements installed${NC}"
echo -e "${GREEN}   ✅ Repository cloned${NC}"
echo -e "${GREEN}   ✅ Environment configured${NC}"
echo -e "${GREEN}   ✅ Dependencies installed${NC}"
echo -e "${GREEN}   ✅ Database setup complete${NC}"
echo -e "${GREEN}   ✅ Application built${NC}"
echo -e "${GREEN}   ✅ PM2 configured and running${NC}"
echo -e "${GREEN}   ✅ Firewall configured${NC}"
echo ""
echo -e "${YELLOW}🌐 Your application is now live at:${NC}"
echo -e "${GREEN}   http://198.38.83.152:$PORT${NC}"
echo ""
echo -e "${YELLOW}📊 Useful PM2 Commands:${NC}"
echo -e "   ${CYAN}pm2 status${NC}                     - Check status"
echo -e "   ${CYAN}pm2 logs $APP_NAME${NC}     - View logs"
echo -e "   ${CYAN}pm2 restart $APP_NAME${NC}  - Restart app"
echo -e "   ${CYAN}pm2 stop $APP_NAME${NC}     - Stop app"
echo -e "   ${CYAN}pm2 monit${NC}                     - Monitor resources"
echo ""
echo -e "${YELLOW}🔄 To update your application:${NC}"
echo -e "   ${CYAN}cd $PROJECT_DIR${NC}"
echo -e "   ${CYAN}git pull${NC}"
echo -e "   ${CYAN}npm ci --production${NC}"
echo -e "   ${CYAN}npm run build${NC}"
echo -e "   ${CYAN}pm2 restart $APP_NAME${NC}"
echo ""
echo -e "${GREEN}🎉 Happy Trading! 📈💰${NC}"
echo ""

