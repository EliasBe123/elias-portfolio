# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY ../web/package*.json ./
RUN npm install
COPY ../web .
RUN npm run build

# Stage 2: Build backend + include frontend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY --from=frontend-build /app/dist /app/web/dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
