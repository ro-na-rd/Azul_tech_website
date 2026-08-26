# Local Docker Testing Guide

This guide will help you test the Docker setup locally on Windows before deploying to your Ubuntu server.

## Prerequisites

### 1. Install Docker Desktop for Windows

- Download from: https://www.docker.com/products/docker-desktop/
- Install and restart your computer
- Make sure WSL 2 is enabled (Docker Desktop will prompt you)

### 2. Verify Docker Installation

```bash
docker --version
docker-compose --version
```

## Local Testing Steps

### 1. Build and Test the Docker Image

```bash
# Build the Docker image
docker build -t azul-web-local .

# Test the image locally
docker run -d --name azul-web-test -p 8080:80 azul-web-local

# Check if it's running
docker ps

# Test the application
# Open http://localhost:8080 in your browser

# View logs
docker logs azul-web-test

# Stop and remove test container
docker stop azul-web-test
docker rm azul-web-test
```

### 2. Test with Docker Compose

```bash
# Build and start with Docker Compose
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

### 3. Test the Deployment Script (Windows)

Since the deploy.sh script is for Linux, we'll test the Docker commands directly:

```bash
# Clean up any existing containers
docker-compose down
docker container rm -f azul-web-app 2>/dev/null || echo "No container to remove"

# Build and start
docker-compose build --no-cache
docker-compose up -d

# Check status
docker ps --filter "name=azul-web-app"

# Test health
curl http://localhost:8080 || echo "Use browser to test: http://localhost:8080"

# View logs
docker-compose logs
```

## Testing Checklist

- [ ] Docker Desktop is running
- [ ] Image builds successfully
- [ ] Container starts without errors
- [ ] Application is accessible at http://localhost:8080
- [ ] All routes work (React Router)
- [ ] Static assets load correctly
- [ ] No console errors in browser
- [ ] Container health check passes

## Troubleshooting

### Common Issues on Windows

1. **Docker Desktop not running**

   ```bash
   # Start Docker Desktop from Start Menu
   # Wait for it to fully start (whale icon in system tray)
   ```

2. **WSL 2 not enabled**

   ```bash
   # Enable WSL 2 feature in Windows
   # Restart computer
   # Update WSL: wsl --update
   ```

3. **Port already in use**

   ```bash
   # Check what's using port 8080
   netstat -ano | findstr :8080

   # Use different port in docker-compose.yml
   ports:
     - "8081:80"  # Use port 8081 instead
   ```

4. **Build failures**

   ```bash
   # Clean Docker cache
   docker system prune -a

   # Check Node.js version in Dockerfile
   # Make sure all files are present
   ```

## Performance Testing

### 1. Check Resource Usage

```bash
# Monitor container resources
docker stats azul-web-app
```

### 2. Test Load Time

- Open browser developer tools
- Navigate to http://localhost:8080
- Check Network tab for load times
- Verify gzip compression is working

### 3. Test Different Routes

- Test main page: http://localhost:8080
- Test direct routes: http://localhost:8080/about (should not 404)
- Test refresh on any route (React Router should work)

## Local Development vs Docker

### Development Mode

```bash
npm install
npm run dev
# Accessible at http://localhost:5173
```

### Docker Mode

```bash
docker-compose up
# Accessible at http://localhost:8080
```

Compare both to ensure Docker build matches development behavior.

## Next Steps

Once local testing passes:

1. Commit all Docker files to git
2. Transfer files to Ubuntu server
3. Run deployment script on server
4. Configure domain and SSL

## Clean Up

When done testing:

```bash
# Stop and remove containers
docker-compose down

# Remove images (optional)
docker rmi azul-web-local
docker image prune

# Clean everything (optional)
docker system prune -a
```
