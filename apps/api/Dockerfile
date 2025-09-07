# Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY apps/web/package*.json ./
RUN npm install
COPY apps/web .
RUN npm run build   # Output: /app/dist

# Build backend
FROM node:20-alpine AS backend-build
WORKDIR /app

# Copy backend package.json and install
COPY apps/api/package*.json ./
RUN npm install

# Copy backend source
COPY apps/api ./

RUN npm run build  # outputs /app/dist


# Ensure the frontend folder exists
RUN mkdir -p /app/web

# Copy frontend build into backend
COPY --from=frontend-build /app/dist /app/web/dist

# Optional: if backend uses TypeScript
# RUN npm run build


FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0

# Copy backend build (including frontend inside /web/dist)
COPY --from=backend-build /app/dist ./dist
COPY --from=backend-build /app/node_modules ./node_modules
COPY --from=backend-build /app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/server.js"]


