FROM node:7.10.1

RUN apt-get update

RUN apt-get install -y rsync

RUN npm install @angular/cli@1.3.0 -g
