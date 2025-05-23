# 1. Base Image: Use an official Node.js LTS image. Alpine is smaller.
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install pnpm for dependency management if you switch from npm
# RUN npm install -g pnpm

# 2. Dependencies: Copy package.json and lock file
COPY package.json package-lock.json* ./
# If using pnpm, copy pnpm-lock.yaml instead
# COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install --frozen-lockfile
# If using pnpm:
# RUN pnpm install --frozen-lockfile

# 3. Build Stage: Build the Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Set ARGS for build-time environment variables if needed (but secrets are better at runtime)
# ARG NEXT_PUBLIC_SOME_VAR
# ENV NEXT_PUBLIC_SOME_VAR=${NEXT_PUBLIC_SOME_VAR}

# Build Next.js app
RUN npm run build

# 4. Runner Stage: Create a smaller production image
FROM base AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
# The GOOGLE_API_KEY will be passed in at runtime via `docker run -e`

# Copy built assets from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy Genkit related files needed at runtime (adjust if your structure is different)
# Assuming dev.ts imports your flows and genkit start can use it with tsx
COPY src/ai ./src/ai
COPY tsconfig.json ./

# Expose ports
# Next.js typically runs on 3000 in production (npm run start)
EXPOSE 3000
# Genkit default flow port
EXPOSE 3400
# Genkit default inspector port (optional, usually not needed in prod container)
# EXPOSE 4001

# Start the application using the docker:start script
# This script will use concurrently to run both Next.js and Genkit
CMD ["npm", "run", "docker:start"]
