FROM node:12

WORKDIR /usr/src/app

COPY *.json ./

RUN npm install

COPY ./src ./src

RUN npm run build

CMD ["node", "./dist/main.js"]
