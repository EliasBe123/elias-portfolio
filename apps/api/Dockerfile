# Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY apps/web/package*.json ./
RUN npm install
COPY apps/web .
RUN npm run build   # Output: /app/dist

# Build backend
FROM node:20-alpine AS api-build
WORKDIR /app
COPY apps/api/package*.json ./
RUN npm install
COPY apps/api .
COPY --from=frontend-build /app/dist /app/web/dist  # embed frontend into backend
RUN npm run build  # if your backend compiles TS, outputs /app/dist


FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0

# Copy backend build (including frontend inside /web/dist)
COPY --from=api-build /app/dist ./dist
COPY --from=api-build /app/node_modules ./node_modules
COPY --from=api-build /app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/server.js"]


