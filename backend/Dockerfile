# Base image with Node.js (secure & slim)
FROM node:20-slim AS builder

# Add OpenSSL installation (important)
RUN apt-get update && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the source code
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript files
RUN npm run build

# ================================
# Production image
FROM node:20-slim

# Install OpenSSL again here
RUN apt-get update && apt-get install -y openssl curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy node_modules and build output from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

RUN npx prisma generate
# Expose port
EXPOSE 4000

# Start the app
CMD ["sh", "-c", "npm run migrate && node dist/server.js"]
