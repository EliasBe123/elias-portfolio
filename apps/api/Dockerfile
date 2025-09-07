FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0

# Copy backend build (including frontend inside /web/dist)
COPY --from=api-build /app/dist ./dist
COPY --from=api-build /app/node_modules ./node_modules
COPY --from=api-build /app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/server.js"]
