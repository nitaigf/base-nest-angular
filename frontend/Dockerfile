# Unified Dockerfile for Frontend (Dev and Prod stages)
ARG BUILD_TYPE=spa

# Dev Base Stage - Simplified for reliability
FROM node:20-alpine AS dev-base

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++ curl

# Install Angular CLI
RUN npm install -g @angular/cli@latest bun

# Copy and install dependencies  
COPY package.json ./
RUN bun install

EXPOSE 4200 4000

# Dev SPA Stage
FROM dev-base AS dev-spa
HEALTHCHECK NONE
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

# Dev SSR Stage  
FROM dev-base AS dev-ssr
HEALTHCHECK NONE
CMD ["npm", "run", "dev:ssr"]

# Prod Build Stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Install Angular CLI globally
RUN bun add -g @angular/cli

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build based on type
RUN if [ "$BUILD_TYPE" = "ssr" ]; then \
      ng build --ssr --configuration production; \
    else \
      ng build --configuration production; \
    fi

# Prod SSR Runner
FROM oven/bun:1-alpine AS ssr-runner

WORKDIR /app

# Copy built application and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb* ./

# Install dependencies including dev for ts-node
RUN bun install --no-cache

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:4000/ || exit 1

CMD ["bun", "src/server.ts"]

# Prod SPA Runner with simple HTTP server
FROM node:20-alpine AS spa-runner

WORKDIR /app

# Install http-server for serving static files
RUN npm install -g http-server

# Copy built application
COPY --from=builder /app/dist/frontend/browser ./public

# Install curl for healthcheck
RUN apk add --no-cache curl

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

CMD ["http-server", "./public", "-p", "8080", "-a", "0.0.0.0", "--proxy", "http://localhost:8080?", "-c-1", "--cors"]