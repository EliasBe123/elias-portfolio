# ---------- Stage 1: Build frontend ----------
FROM node:20-alpine AS frontend-build

WORKDIR /app

# Install frontend dependencies
COPY apps/web/package*.json ./apps/web/
WORKDIR /app/apps/web
RUN npm install

# Copy frontend source
COPY apps/web ./ 

# Build frontend (outputs to /app/apps/web/dist)
RUN npm run build



# ---------- Stage 2: Build backend ----------
FROM node:20-alpine AS backend-build

WORKDIR /app

# Install backend dependencies
COPY apps/api/package*.json ./apps/api/
WORKDIR /app/apps/api
RUN npm install

# Copy backend source
COPY apps/api ./ 

# Copy built frontend into backend folder
RUN mkdir -p /app/apps/api/web
COPY --from=frontend-build /app/dist /app/dist/public

# Build backend (outputs to /app/apps/api/dist, assuming TS build)
RUN npm run build



# ---------- Stage 3: Final runtime ----------
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy backend build output
COPY --from=backend-build /app/apps/api/dist ./dist

# Copy backend node_modules and package.json
COPY --from=backend-build /app/apps/api/node_modules ./node_modules
COPY --from=backend-build /app/apps/api/package*.json ./

# Copy frontend build into runtime image
COPY --from=backend-build /app/apps/api/web ./web

# Expose port
EXPOSE 3000

# Start backend (which should serve API + frontend from /web/dist)
CMD ["node", "dist/server.js"]

