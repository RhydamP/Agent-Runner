# Base image for building the frontend
FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the frontend app
RUN npm run build

# ================================
# Production image with Next.js runtime
FROM node:20-slim

WORKDIR /app

# Copy dependencies and built app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the frontend port
EXPOSE 3000

# Run Next.js in production mode
CMD ["npx", "next", "start"]
