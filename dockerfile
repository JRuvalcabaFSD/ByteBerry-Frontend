# Multi-stage Dockerfile for ByteBerry Frontend
# Supports: linux/amd64, linux/arm64

FROM node:lts-slim AS builder

WORKDIR /app

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Runtime stage
FROM nginx:alpine AS runtime

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S frontend && \
  adduser -S frontend -u 1001 -G frontend

# Copy built files from builder
COPY --from=builder --chown=frontend:frontend /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY --chown=frontend:frontend nginx.conf /etc/nginx/nginx.conf

# Copy healthcheck script
COPY --chown=frontend:frontend ./scripts/healthcheck.sh /healthcheck.sh
RUN chmod +x /healthcheck.sh

# Expose port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD ["/bin/sh", "/healthcheck.sh"]

# Switch to non-root user
USER frontend

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
