# Étape 1 : Build
FROM node:16.14-alpine AS build

WORKDIR /app-backend

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

# Étape 2 : Production
FROM node:16.14-alpine

WORKDIR /app-backend

COPY --from=build /app-backend/build ./build
COPY package*.json ./

RUN npm install --only=production

ENV NODE_ENV=production
CMD ["node", "build/server.js"]
