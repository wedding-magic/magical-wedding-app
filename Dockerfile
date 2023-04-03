FROM node:18-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["node", "./src/server/server.ts"]