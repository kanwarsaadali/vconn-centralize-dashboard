# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install all dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Stage 2: Create production image
FROM node:22-alpine AS production

# Set working directory
WORKDIR /app

# Copy only the package files and install only production deps
COPY package.json package-lock.json ./

# Install only production dependencies (using --legacy-peer-deps for safety)
RUN npm install --only=production --legacy-peer-deps

# Copy build artifacts from builder stage
COPY --from=builder /app/.next /app/.next

# Copy other required files (if any, e.g., next.config.js or public assets)
# You can uncomment this if needed
# COPY --from=builder /app/public /app/public
# COPY --from=builder /app/next.config.js /app/next.config.js

# Expose the port
EXPOSE 3001

# Set the environment variable
ENV PORT=3001

# Start the app
CMD ["npm", "run", "start", "--", "-p", "3001"]