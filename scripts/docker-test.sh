#!/bin/bash
# Script para probar imagen Docker en CI/CD (limpia automáticamente)

set -e

SERVICE_NAME="byteberry-frontend"
DOCKER_USER="jruvalcabafsd"
CONTAINER_NAME="byteberry-frontend-ci-test"
PORT=4003

echo "🧪 CI/CD Testing Docker image: ${DOCKER_USER}/${SERVICE_NAME}:latest"
echo ""

# Cleanup function
cleanup() {
    if [ "$(docker ps -aq -f name=${CONTAINER_NAME})" ]; then
        echo ""
        echo "🧹 Cleaning up..."
        docker stop ${CONTAINER_NAME} >/dev/null 2>&1 || true
        docker rm ${CONTAINER_NAME} >/dev/null 2>&1 || true
        echo "✅ Container removed"
    fi
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Stop and remove existing container if exists
if [ "$(docker ps -aq -f name=${CONTAINER_NAME})" ]; then
    echo "🧹 Removing existing container..."
    docker rm -f ${CONTAINER_NAME}
fi

# Run container
echo "🚀 Starting container..."
docker run -d \
  --name ${CONTAINER_NAME} \
  --platform linux/amd64 \
  -p ${PORT}:4003 \
  ${DOCKER_USER}/${SERVICE_NAME}:latest

echo ""
echo "⏳ Waiting for container to start..."
sleep 3

# Check if container is running
if ! docker ps -f name=${CONTAINER_NAME} | grep -q ${CONTAINER_NAME}; then
    echo "❌ Container failed to start"
    echo "📋 Container logs:"
    docker logs ${CONTAINER_NAME}
    exit 1
fi

echo "✅ Container is running"

# Test HTTP endpoint
echo ""
echo "🔍 Testing HTTP endpoint..."
MAX_RETRIES=10
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -f -s http://localhost:${PORT}/health > /dev/null 2>&1; then
        echo "✅ HTTP endpoint is responding"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
        echo "❌ HTTP endpoint not responding after ${MAX_RETRIES} attempts"
        echo "📋 Container logs:"
        docker logs ${CONTAINER_NAME}
        exit 1
    fi
    echo "   Attempt $RETRY_COUNT/$MAX_RETRIES - waiting..."
    sleep 2
done

# Test main page
echo ""
echo "🔍 Testing main page..."
if curl -f -s http://localhost:${PORT}/ > /dev/null 2>&1; then
    echo "✅ Main page is responding"
else
    echo "❌ Main page not responding"
    exit 1
fi

echo ""
echo "✅ All tests passed!"

# Cleanup will run automatically via trap
