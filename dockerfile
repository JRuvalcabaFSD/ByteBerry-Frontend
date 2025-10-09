# ==============================================================================
# Stage 1: Builder
# Build the React application with Vite
# ==============================================================================
FROM node:lts-slim AS builder

# Build arguments for environment variables
ARG VITE_BFF_URL=http://localhost:4002
ARG VITE_NODE_ENV=production

# Set working directory
WORKDIR /app

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Set environment variables from build args
ENV VITE_NODE_ENV=${VITE_NODE_ENV}

# Build application (environment variables are embedded here)
RUN pnpm build

# ==============================================================================
# Stage 2: Runtime
# Serve the built application with nginx
# ==============================================================================
FROM nginx:alpine AS runtime

# Install wget for healthcheck
RUN apk add --no-cache wget

# Remove default nginx config and content
RUN rm -rf /etc/nginx/nginx.conf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy healthcheck script
COPY --from=builder /app/scripts/healthcheck.sh healthcheck.sh
RUN chmod +x healthcheck.sh

# Create nginx user and set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
  chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /var/log/nginx && \
  touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 4003

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD ["/usr/local/bin/healthcheck.sh"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
RUN ls -la /usr/share/nginx/html
