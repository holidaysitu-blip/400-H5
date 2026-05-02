#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/www/wwwroot/400-H5}"
APP_REPO="${APP_REPO:-https://github.com/holidaysitu-blip/400-H5.git}"
API_PORT="${PORT:-8787}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-400hezishequ}"
SUPABASE_URL="${SUPABASE_URL:-https://lciwdfypdxkcptjvixce.supabase.co}"

if [ -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]; then
  echo "Missing SUPABASE_SERVICE_ROLE_KEY."
  echo "Run this first, then rerun the script:"
  echo "export SUPABASE_SERVICE_ROLE_KEY='your-supabase-service-role-key'"
  exit 1
fi

echo "==> Installing system dependencies"
if command -v apt >/dev/null 2>&1; then
  sudo apt update
  sudo apt install -y git nginx nodejs npm curl
elif command -v yum >/dev/null 2>&1; then
  sudo yum install -y git nginx nodejs npm curl
else
  echo "Unsupported package manager. Please install git, nginx, nodejs, and npm manually."
  exit 1
fi

echo "==> Installing PM2"
sudo npm install -g pm2

echo "==> Backing up existing app and nginx config"
sudo mkdir -p /www/backup /www/wwwroot
if [ -d "$APP_DIR" ]; then
  sudo mv "$APP_DIR" "/www/backup/400-H5-$(date +%Y%m%d-%H%M%S)"
fi
if [ -d /etc/nginx ]; then
  sudo cp -a /etc/nginx "/www/backup/nginx-$(date +%Y%m%d-%H%M%S)"
fi

echo "==> Cloning H5 project"
cd /www/wwwroot
sudo git clone "$APP_REPO" 400-H5
sudo chown -R "$(whoami):$(whoami)" "$APP_DIR"
cd "$APP_DIR"

echo "==> Writing .env"
cat > .env <<EOF
ADMIN_PASSWORD=${ADMIN_PASSWORD}
SUPABASE_URL=${SUPABASE_URL}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
PORT=${API_PORT}
EOF
chmod 600 .env

echo "==> Installing npm dependencies and building frontend"
npm install
npm run build

echo "==> Starting API service with PM2"
pm2 delete 400-h5-api >/dev/null 2>&1 || true
pm2 start deploy/pm2.config.cjs
pm2 save

echo "==> Configuring nginx"
sudo mkdir -p /etc/nginx/conf.d
sudo cp deploy/nginx.conf.example /etc/nginx/conf.d/400-h5.conf
if [ -f /etc/nginx/sites-enabled/default ]; then
  sudo rm -f /etc/nginx/sites-enabled/default
fi

sudo nginx -t
sudo systemctl enable nginx >/dev/null 2>&1 || true
sudo systemctl restart nginx || sudo service nginx restart

echo "==> Smoke tests"
curl -I http://127.0.0.1/ || true
curl -I http://127.0.0.1/admin || true
curl -s http://127.0.0.1:${API_PORT}/api/admin-registrations -H "Authorization: Bearer wrong-password" || true

echo
echo "Deployment finished."
echo "Homepage: http://101.34.59.6/"
echo "Admin:    http://101.34.59.6/admin"
