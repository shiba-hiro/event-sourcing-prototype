FROM node:12-slim
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --only=production
COPY . ./
RUN yarn build
CMD [ "yarn", "start:js" ]
