FROM node:6-alpine

ARG NODE_ENV=development

WORKDIR /node
COPY package.json .
RUN chown -R node:node /node

USER node
RUN npm install

# copy source last to ensure maximum cache utilization
# as it's the part likely to change most often.
COPY . .
RUN mkdir public && \
    chown node:node public

CMD ["npm", "run", "build"]
