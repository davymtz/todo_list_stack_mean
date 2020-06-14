#Crear una imagen a partir de otro contenedor...
FROM node:current-slim

RUN mkdir -p /usr/src/app && apt-get update
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm","start"]

