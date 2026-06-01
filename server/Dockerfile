FROM node:lts-alpine

WORKDIR /usr/share/node

# package
COPY ./server/package*.json ./
RUN npm ci

COPY ./server/src ./src
COPY ./server/tsconfig.json ./

RUN npx tsc

RUN npm ci --only=production

VOLUME ["/usr/share/node/logs"]

EXPOSE 3000
CMD ["node", "./src/server.js"]