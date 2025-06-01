# Base image with Node.js (secure & slim)
FROM node:20-slim AS builder

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

WORKDIR /app

# Copy node_modules and build output from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

# Expose port
EXPOSE 4000

# Start the app
CMD ["node", "dist/server.js"]
