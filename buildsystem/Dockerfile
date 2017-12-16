FROM node:8.9.1
MAINTAINER Johan Kanefur <johan.canefur@gmail.com>

WORKDIR /home/node/app

COPY scripts ./scripts
COPY src ./src
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN apt-get update
RUN apt install netcat -y

RUN npm install

ENTRYPOINT [ "bash", "./scripts/entrypoint.sh" ]
