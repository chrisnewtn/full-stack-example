FROM node:6-alpine

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV} \
    APP_PORT=8080

EXPOSE ${APP_PORT}

WORKDIR /node
COPY package.json .
RUN chown -R node:node /node

USER node
RUN npm install

# copy source last to ensure maximum cache utilization
# as it's the part likely to change most often.
COPY . .

CMD ["node", "."]
