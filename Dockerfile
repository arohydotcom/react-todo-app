# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM caddy:2-alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/caddy

# Copy Caddyfile for SPA routing
COPY <<EOF /etc/caddy/Caddyfile
:80 {
    root * /usr/share/caddy
    encode gzip
    try_files {path} /index.html
    file_server
}
EOF

EXPOSE 80
