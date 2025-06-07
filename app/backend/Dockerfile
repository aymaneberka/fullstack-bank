
# Étape 1 : Build
FROM node:16.14-alpine AS build

WORKDIR /app-backend

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY .sequelizerc ./

RUN npm install
RUN npm run build

# Étape 2 : Production
FROM node:16.14-alpine

WORKDIR /app-backend

COPY --from=build /app-backend/build ./build
COPY package*.json ./
COPY .sequelizerc ./

RUN npm install

ENV NODE_ENV=production
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && node build/server.js"]
