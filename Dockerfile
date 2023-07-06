FROM node:latest

WORKDIR /

COPY . .

RUN npm ci
RUN npm run build
