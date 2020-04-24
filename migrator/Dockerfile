FROM node:12

WORKDIR /usr/src/app

COPY *.json ./

RUN npm install

COPY ./migrations ./migrations

CMD ["npm", "run", "migrate"]
