# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set the working directory for building
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install build dependencies
RUN npm install

# Copy the rest of the application files for the build process
COPY . .

# Build the application (production build)
RUN npm run build

# Stage 2: Setup the production image
FROM node:22-alpine AS production

# Set the working directory for production
WORKDIR /app

# Install only the production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the build artifacts from the builder stage
COPY --from=builder /app/.next /app/.next

# Exclude copying the `public` folder
# The `public` folder will be mounted as a volume during container runtime

# Expose port 3001 for the app
EXPOSE 3001

# Set the environment variable to specify the port (optional)
ENV PORT=3001

# Command to run the app (use port 3001)
CMD ["npm", "run", "start", "--", "-p", "3001"]
