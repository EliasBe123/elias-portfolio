# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/web
COPY apps/web/package*.json ./
RUN npm install
COPY apps/web .
RUN npm run build

# Stage 2: Build backend
FROM node:20-alpine AS backend-build
WORKDIR /app/api
COPY apps/api/package*.json ./
RUN npm install
COPY apps/api .
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/api/dist ./api/dist
COPY --from=backend-build /app/api/package*.json ./api/
RUN npm install --production --prefix ./api

# Copy frontend build
COPY --from=frontend-build /app/web/dist ./web/dist

# Expose port
EXPOSE 3000

# Start Express server
CMD ["node", "api/dist/server.js"]
