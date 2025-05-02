# Stage 1: Build Stage
FROM oven/bun:1.1.27-alpine as builder

WORKDIR /app

# Copy only files needed for installing dependencies
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy Prisma schema and source files
COPY src/config/scheme.prisma ./prisma
COPY . .

# Generate Prisma Client
RUN bunx prisma generate

# Stage 2: Production Image
FROM oven/bun:1.1.27-alpine

WORKDIR /app

# Copy app and generated prisma client from builder
COPY --from=builder /app /app

# Set environment variable for production
ENV NODE_ENV=production

# Expose your app's port
EXPOSE 8001

# Start the server
CMD ["bun", "run", "start"]
