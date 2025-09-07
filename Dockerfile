# Use official Node.js image
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY apps/web/package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Build app
RUN npm run build

# Install a simple server to serve the build
RUN npm install -g serve

# Start server
CMD ["serve", "-s", "dist", "-l", "3000"]
