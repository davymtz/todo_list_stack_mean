FROM node:current-slim

RUN apt-get update && mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install npm -g && npm install -g @angular/cli
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm","start"]

