#!/usr/bin/env bash
# Script para construir imagen Docker detectando plataforma
# - Single-arch -> --load (daemon local)
# - Multi-arch  -> --push (registry)
set -euo pipefail

# === Cargar variables de .env si existe ===
if [ -f .env ]; then
  # Carga sólo líneas no comentadas ni vacías
  export $(grep -vE '^\s*#' .env | grep -vE '^\s*$' | xargs -I {} echo {})
fi

# === Configuración por defecto (puedes ajustar) ===
SERVICE_NAME="${SERVICE_NAME:-byteberry-frontend}"
DOCKER_USER="${DOCKER_USER:-jruvalcabafsd}"
VERSION="latest"

# Build args (desde .env con fallback)
BFF_URL="${VITE_BFF_URL:-http://localhost:4002}"
NODE_ENV="${VITE_NODE_ENV:-production}"

# === Detección de plataforma del host ===
detect_platform() {
  arch="$(uname -m || true)"
  case "$arch" in
    x86_64|amd64)   echo "linux/amd64" ;;
    aarch64|arm64)  echo "linux/arm64" ;;
    armv7l|armv7)   echo "linux/arm/v7" ;;
    *)              echo "linux/amd64" ;; # valor seguro por defecto
  esac
}

HOST_PLATFORM="$(detect_platform)"
PLATFORMS="$HOST_PLATFORM"   # por defecto usa la plataforma detectada

# === Parseo simple de flags ===
# -v 1.2.3   -> version/tag
# -p list    -> plataformas (ej: linux/amd64,linux/arm64)
# --push     -> forzar push incluso en single-arch
# --load     -> forzar load (sólo válido con single-arch)
FORCE_PUSH=false
FORCE_LOAD=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    -v|--version) VERSION="$2"; shift 2 ;;
    -p|--platform) PLATFORMS="$2"; shift 2 ;;
    --push) FORCE_PUSH=true; shift ;;
    --load) FORCE_LOAD=true; shift ;;
    -h|--help)
      echo "Uso: $0 [-v VERSION] [-p PLATFORMS] [--push|--load]"
      echo "Ejemplos:"
      echo "  $0                        # auto-detecta plataforma y --load"
      echo "  $0 -v 1.0.0               # tag 1.0.0 en plataforma detectada"
      echo "  $0 -p linux/amd64,linux/arm64   # multi-arch -> --push"
      echo "  $0 -p linux/amd64 --load  # single-arch -> --load"
      exit 0
      ;;
    *)
      echo "Flag no reconocido: $1"; exit 1 ;;
  esac
done

IMAGE="${DOCKER_USER}/${SERVICE_NAME}:${VERSION}"

# === Determinar exportador según plataformas/flags ===
is_multi_arch=false
if [[ "$PLATFORMS" == *","* ]]; then
  is_multi_arch=true
fi

# Validaciones de compatibilidad
if $FORCE_LOAD && $is_multi_arch; then
  echo "❌ --load no es compatible con multi-arch. Usa --push o una única plataforma."
  exit 1
fi

# === Asegurar builder de buildx ===
if ! docker buildx inspect >/dev/null 2>&1; then
  echo "🔧 Creando builder buildx por primera vez…"
  docker buildx create --use --name bb-builder
fi

echo "🐳 Imagen:        ${IMAGE}"
echo "👤 Namespace:      ${DOCKER_USER}"
echo "📦 Servicio:       ${SERVICE_NAME}"
echo "🏷️  Tags extra:    ${DOCKER_USER}/${SERVICE_NAME}:latest"
echo "🧭 Plataformas:    ${PLATFORMS}"
echo "🔧 Build args:"
echo "   VITE_BFF_URL=${BFF_URL}"
echo "   VITE_NODE_ENV=${NODE_ENV}"
echo ""

# === Componer comando buildx ===
cmd=( docker buildx build
  --platform "${PLATFORMS}"
  --build-arg "VITE_BFF_URL=${BFF_URL}"
  --build-arg "VITE_NODE_ENV=${NODE_ENV}"
  --tag "${IMAGE}"
  --tag "${DOCKER_USER}/${SERVICE_NAME}:latest"
  .
)

if $is_multi_arch || $FORCE_PUSH; then
  echo "🚀 Exportador: --push (multi-arch o forzado)"
  cmd+=( --push )
else
  echo "📥 Exportador: --load (single-arch al daemon local)"
  cmd+=( --load )
fi

# === Ejecutar build ===
echo "▶️  Ejecutando: ${cmd[*]}"
"${cmd[@]}"

echo ""
echo "✅ Build completo"
echo "🏷️  Tags:"
echo "   - ${IMAGE}"
echo "   - ${DOCKER_USER}/${SERVICE_NAME}:latest"
