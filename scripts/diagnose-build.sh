#!/bin/bash

# 🔍 Script de Diagnóstico de Build - ByteBerry Frontend
# Este script simula el proceso de build del CI/CD localmente

set -e  # Exit on error

echo "🔍 ByteBerry Frontend - Build Diagnostic Script"
echo "================================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar que estamos en el directorio correcto
echo "📁 Step 1: Verificando directorio actual..."
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ ERROR: No se encontró package.json${NC}"
    echo "   Asegúrate de ejecutar este script desde la raíz del proyecto"
    exit 1
fi
echo -e "${GREEN}✅ package.json encontrado${NC}"
echo ""

# 2. Verificar que pnpm está instalado
echo "📦 Step 2: Verificando pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ ERROR: pnpm no está instalado${NC}"
    echo "   Instala pnpm: npm install -g pnpm"
    exit 1
fi
PNPM_VERSION=$(pnpm --version)
echo -e "${GREEN}✅ pnpm instalado: v$PNPM_VERSION${NC}"
echo ""

# 3. Limpiar build anterior
echo "🧹 Step 3: Limpiando build anterior..."
if [ -d "dist" ]; then
    echo "   Removiendo dist/ existente..."
    rm -rf dist/
    echo -e "${GREEN}✅ dist/ removido${NC}"
else
    echo "   No hay dist/ anterior para limpiar"
fi
echo ""

# 4. Verificar node_modules
echo "📦 Step 4: Verificando node_modules..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules no encontrado, instalando dependencias...${NC}"
    pnpm install --frozen-lockfile
else
    echo -e "${GREEN}✅ node_modules existe${NC}"
fi
echo ""

# 5. Verificar configuración de Vite
echo "⚙️  Step 5: Verificando vite.config.ts..."
if [ -f "vite.config.ts" ]; then
    echo -e "${GREEN}✅ vite.config.ts encontrado${NC}"
    echo ""
    echo "📄 Contenido de vite.config.ts:"
    echo "--------------------------------"
    cat vite.config.ts
    echo "--------------------------------"
else
    echo -e "${RED}❌ ERROR: vite.config.ts no encontrado${NC}"
    exit 1
fi
echo ""

# 6. Configurar variables de entorno
echo "🔧 Step 6: Configurando variables de entorno..."
export VITE_BFF_URL="http://localhost:4002"
export VITE_NODE_ENV="production"
echo "   VITE_BFF_URL=$VITE_BFF_URL"
echo "   VITE_NODE_ENV=$VITE_NODE_ENV"
echo -e "${GREEN}✅ Variables configuradas${NC}"
echo ""

# 7. Ejecutar build
echo "🗂️  Step 7: Ejecutando build..."
echo "   Comando: pnpm build"
echo ""

if pnpm build; then
    echo ""
    echo -e "${GREEN}✅ Build completado exitosamente${NC}"
else
    echo ""
    echo -e "${RED}❌ ERROR: Build falló${NC}"
    exit 1
fi
echo ""

# 8. Verificar output del build
echo "📊 Step 8: Verificando output del build..."
echo ""

# Verificar que dist/ existe
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ ERROR: dist/ NO fue creado${NC}"
    echo ""
    echo "🔍 Estructura del proyecto:"
    ls -la
    exit 1
fi
echo -e "${GREEN}✅ dist/ creado correctamente${NC}"
echo ""

# Mostrar contenido de dist/
echo "📁 Contenido de dist/:"
echo "----------------------"
ls -lah dist/
echo ""

# Verificar index.html
if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ ERROR: dist/index.html NO existe${NC}"
    echo ""
    echo "📄 Archivos en dist/:"
    find dist/ -type f
    exit 1
fi
echo -e "${GREEN}✅ dist/index.html existe${NC}"
echo ""

# Verificar assets/ (opcional)
if [ ! -d "dist/assets" ]; then
    echo -e "${YELLOW}⚠️  WARNING: dist/assets/ no existe${NC}"
    echo "   Esto podría ser normal si Vite usa una estructura diferente"
    echo ""
    echo "📁 Estructura de dist/:"
    tree dist/ 2>/dev/null || find dist/ -type d
else
    echo -e "${GREEN}✅ dist/assets/ existe${NC}"
    echo ""
    echo "📄 Archivos en assets/:"
    ls -lah dist/assets/ | head -10
fi
echo ""

# 9. Estadísticas del build
echo "📊 Step 9: Estadísticas del build..."
echo "-----------------------------------"
echo "📦 Tamaño total: $(du -sh dist/ | cut -f1)"
echo "📄 HTML files: $(find dist/ -name "*.html" | wc -l)"
echo "🎨 CSS files: $(find dist/ -name "*.css" | wc -l)"
echo "⚙️  JS files: $(find dist/ -name "*.js" | wc -l)"
echo "🖼️  Image files: $(find dist/ -name "*.png" -o -name "*.jpg" -o -name "*.svg" -o -name "*.ico" | wc -l)"
echo ""

# 10. Verificar que puede servirse
echo "🧪 Step 10: Test opcional - Servir build localmente..."
echo "   Para probar el build, ejecuta:"
echo -e "${YELLOW}   pnpm preview${NC}"
echo "   O con un servidor simple:"
echo -e "${YELLOW}   npx serve dist -p 4003${NC}"
echo ""

# Resumen final
echo "================================================"
echo "🎉 DIAGNÓSTICO COMPLETADO EXITOSAMENTE"
echo "================================================"
echo ""
echo "✅ Todos los checks pasaron. El build funciona correctamente."
echo ""
echo "📋 Próximos pasos:"
echo "   1. Commitea los cambios al Dockerfile y workflow"
echo "   2. Haz push a tu rama"
echo "   3. El CI/CD debería funcionar ahora"
echo ""
echo "🔍 Si el CI/CD sigue fallando:"
echo "   1. Compara este output con los logs de GitHub Actions"
echo "   2. Verifica que las variables de entorno estén configuradas en GitHub"
echo "   3. Revisa que .gitignore incluya dist/"
echo ""
