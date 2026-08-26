#!/bin/bash

# Azul Tech Deployment Script
# Production-ready deployment for Ubuntu server

set -e

PROJECT_NAME="azul-web"
CONTAINER_NAME="${PROJECT_NAME}-app"
DOMAIN="${DOMAIN:-localhost}"
EMAIL="${EMAIL:-admin@azultech.com}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
}

# Deploy application
deploy() {
    log "Starting deployment of ${PROJECT_NAME}..."
    
    check_docker
    
    # Stop existing containers
    log "Stopping existing containers..."
    docker-compose down --remove-orphans || true
    
    # Pull latest changes (if in git repo)
    if [ -d ".git" ]; then
        log "Pulling latest changes..."
        git pull origin main || git pull origin master || warn "Could not pull latest changes"
    fi
    
    # Build and start containers
    log "Building and starting containers..."
    docker-compose up -d --build
    
    # Wait for health check
    log "Waiting for application to be healthy..."
    sleep 10
    
    # Check if container is running
    if docker ps | grep -q "${CONTAINER_NAME}"; then
        log "✅ Application deployed successfully!"
        log "🌐 Local access: http://localhost:8080"
        if [ "$DOMAIN" != "localhost" ]; then
            log "🌍 Production access: http://${DOMAIN}"
        fi
    else
        error "❌ Deployment failed. Check logs with: ./deploy.sh logs"
        exit 1
    fi
}

# Update deployment
update() {
    log "Updating ${PROJECT_NAME}..."
    
    # Pull latest code
    if [ -d ".git" ]; then
        log "Pulling latest changes..."
        git pull origin main || git pull origin master
    fi
    
    # Rebuild and restart
    log "Rebuilding application..."
    docker-compose down
    docker-compose up -d --build
    
    log "✅ Update completed!"
}

# Restart containers
restart() {
    log "Restarting ${PROJECT_NAME}..."
    docker-compose restart
    log "✅ Application restarted!"
}

# View logs
logs() {
    log "Showing logs for ${PROJECT_NAME}..."
    docker-compose logs -f --tail=100
}

# Check status
status() {
    log "Checking status of ${PROJECT_NAME}..."
    echo
    echo "=== Container Status ==="
    docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo
    echo "=== Health Check ==="
    if command -v curl &> /dev/null; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 || echo "000")
        if [ "$HTTP_CODE" = "200" ]; then
            echo -e "${GREEN}✅ Application is responding (HTTP $HTTP_CODE)${NC}"
        else
            echo -e "${RED}❌ Application not responding (HTTP $HTTP_CODE)${NC}"
        fi
    else
        warn "curl not installed, cannot check HTTP status"
    fi
}

# Clean up Docker resources
cleanup() {
    log "Cleaning up Docker resources..."
    docker-compose down --volumes --remove-orphans
    docker system prune -f
    log "✅ Cleanup completed!"
}

# Setup nginx reverse proxy
setup_nginx() {
    log "Setting up nginx reverse proxy..."
    
    # Check if nginx is installed
    if ! command -v nginx &> /dev/null; then
        log "Installing nginx..."
        sudo apt update
        sudo apt install -y nginx
    fi
    
    # Create nginx configuration
    cat > /tmp/azul-web-nginx.conf << EOF
server {
    listen 80;
    server_name ${DOMAIN};
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    
    # Install nginx configuration
    sudo mv /tmp/azul-web-nginx.conf /etc/nginx/sites-available/azul-web
    sudo ln -sf /etc/nginx/sites-available/azul-web /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test and restart nginx
    sudo nginx -t
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    log "✅ Nginx reverse proxy configured for ${DOMAIN}"
}

# Setup SSL with Let's Encrypt
setup_ssl() {
    if [ "$DOMAIN" = "localhost" ]; then
        error "Cannot setup SSL for localhost. Please set DOMAIN environment variable."
        exit 1
    fi
    
    log "Setting up SSL certificate for ${DOMAIN}..."
    
    # Install certbot
    if ! command -v certbot &> /dev/null; then
        log "Installing certbot..."
        sudo apt update
        sudo apt install -y certbot python3-certbot-nginx
    fi
    
    # Get SSL certificate
    sudo certbot --nginx -d "${DOMAIN}" --email "${EMAIL}" --agree-tos --non-interactive
    
    log "✅ SSL certificate installed for ${DOMAIN}"
}

# Show help
show_help() {
    echo "Azul Tech Deployment Script"
    echo
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Commands:"
    echo "  deploy    - Deploy the application (build and start)"
    echo "  update    - Pull latest code and redeploy"
    echo "  restart   - Restart the application"
    echo "  status    - Check application status"
    echo "  logs      - View application logs"
    echo "  cleanup   - Clean up Docker resources"
    echo "  nginx     - Setup nginx reverse proxy"
    echo "  ssl       - Setup SSL certificate with Let's Encrypt"
    echo "  help      - Show this help message"
    echo
    echo "Environment Variables:"
    echo "  DOMAIN    - Domain name for nginx setup (default: localhost)"
    echo "  EMAIL     - Email for SSL certificate (default: admin@azultech.com)"
    echo
    echo "Examples:"
    echo "  $0 deploy"
    echo "  DOMAIN=azultech.com $0 nginx"
    echo "  DOMAIN=azultech.com EMAIL=admin@azultech.com $0 ssl"
}

# Main command handler
case "${1:-help}" in
    deploy)
        deploy
        ;;
    update)
        update
        ;;
    restart)
        restart
        ;;
    status)
        status
        ;;
    logs)
        logs
        ;;
    cleanup)
        cleanup
        ;;
    nginx)
        setup_nginx
        ;;
    ssl)
        setup_ssl
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac