# apps/api/Dockerfile

# --- Build frontend first ---
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY apps/web/package*.json ./
RUN npm install
COPY apps/web .
RUN npm run build

# --- Build backend ---
FROM node:20-alpine AS api-build
WORKDIR /app
COPY apps/api/package*.json ./
RUN npm install
COPY apps/api .
COPY --from=frontend-build /app/dist /app/web/dist

FROM node:20-alpine
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0
WORKDIR /app
COPY --from=api-build /repo/apps/api/dist ./dist
COPY --from=api-build /repo/apps/api/node_modules ./node_modules
COPY --from=api-build /repo/apps/api/package*.json ./
COPY --from=frontend-build /repo/apps/web/dist ./web/dist

EXPOSE 3000
CMD ["node", "dist/server.js"]

