FROM node:lts-alphine

WORKDIR /usr/share/node

# package
COPY ./server/package*.json ./
RUN npm ci --only=production

COPY ./server/src ./src

VOLUME ["/usr/share/node/logs"]

EXPOSE 3000
CMD ["node", "./src/server.js"]