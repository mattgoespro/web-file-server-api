FROM node:22

WORKDIR /usr/src/app

COPY ./dist/file-server/file-server.js .

COPY ./package*.json .

RUN npm ci

CMD ["node", "file-server.js"]