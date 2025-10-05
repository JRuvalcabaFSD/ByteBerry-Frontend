#!/bin/bash
# Script para probar release local (simula CI/CD)

set -e

SERVICE_NAME="byteberry-frontend"

echo "🧪 Testing local release process for ${SERVICE_NAME}"
echo ""

# Step 1: Lint
echo "1️⃣  Running lint..."
pnpm lint
echo "✅ Lint passed"
echo ""

# Step 2: Type check
echo "2️⃣  Running type check..."
pnpm type-check
echo "✅ Type check passed"
echo ""

# Step 3: Build
echo "3️⃣  Building application..."
pnpm build
echo "✅ Build passed"
echo ""

# Step 4: Docker build
echo "4️⃣  Building Docker image..."
bash scripts/docker-build.sh "test"
echo "✅ Docker build passed"
echo ""

# Step 5: Docker test
echo "5️⃣  Testing Docker image..."
bash scripts/docker-test.sh
echo "✅ Docker test passed"
echo ""

echo "🎉 All release checks passed!"
echo "📦 Ready for production release"
