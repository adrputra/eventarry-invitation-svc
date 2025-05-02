# Stage 1: Build with Bun
FROM oven/bun:1.1.27-alpine AS builder

WORKDIR /app

# Install dependencies using Bun
COPY package.json bun.lock ./
RUN bun install

# Copy remaining app files
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Compile TypeScript to JavaScript
RUN bun run build

# Stage 2: Production runtime with Node.js
FROM node:20-alpine AS production

WORKDIR /app

# Copy compiled output and dependencies from build stage
COPY --from=builder /app /app

# Only install production dependencies
RUN npm install --omit=dev

# Expose the port your server listens on
EXPOSE 8003

# Run the compiled JS server
CMD ["node", "dist/index.js"]
