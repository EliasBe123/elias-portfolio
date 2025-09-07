FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY package*.json ./
RUN npm install

# Copy backend source code
COPY . .

# Copy frontend dist folder (built locally or via frontend Docker stage)
COPY ../../web/dist ./web/dist

EXPOSE 3000

# Run your Express server
CMD ["node", "dist/server.js"]
