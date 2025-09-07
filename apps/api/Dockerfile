FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY --from=frontend-build /app/dist /app/web/dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
