#!/bin/bash
# Script para construir imagen Docker multi-arch localmente

set -e

SERVICE_NAME="byteberry-frontend"
DOCKER_USER="jruvalcabafsd"
VERSION=${1:-"latest"}
BFF_URL=${2:-"http://localhost:4002"}
NODE_ENV=${3:-"production"}

echo "🐳 Building Docker image: ${DOCKER_USER}/${SERVICE_NAME}:${VERSION}"
echo "📦 Multi-arch: linux/amd64, linux/arm64"
echo "🔧 Build args:"
echo "   VITE_BFF_URL=${BFF_URL}"
echo "   VITE_NODE_ENV=${NODE_ENV}"
echo ""

# Build multi-arch image
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --build-arg VITE_BFF_URL=${BFF_URL} \
  --build-arg VITE_NODE_ENV=${NODE_ENV} \
  --tag ${DOCKER_USER}/${SERVICE_NAME}:${VERSION} \
  --tag ${DOCKER_USER}/${SERVICE_NAME}:latest \
  --load \
  .

echo ""
echo "✅ Build complete!"
echo "🏷️  Image tagged as:"
echo "   - ${DOCKER_USER}/${SERVICE_NAME}:${VERSION}"
echo "   - ${DOCKER_USER}/${SERVICE_NAME}:latest"
