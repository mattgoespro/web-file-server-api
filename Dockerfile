FROM node:22 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22

WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app

EXPOSE 3000

CMD ["node", "dist/index.js"]
