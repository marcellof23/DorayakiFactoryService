# Dockerfile
FROM node:14.4.0-alpine3.11 as base

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install package for better caching strategy
ADD package.json yarn.lock ./

# update and install dependency
RUN apk add git

# copy the app, note .dockerignore
COPY . .
RUN yarn install --silent
RUN yarn build
RUN git clone https://github.com/vishnubob/wait-for-it.git

RUN apk update && apk add bash

EXPOSE 5000

CMD ["yarn", "start"]