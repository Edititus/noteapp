FROM node:18 AS notes

WORKDIR /app

COPY . .

RUN yarn

RUN yarn tsc

FROM node:18-alpine AS app

WORKDIR /app

COPY --from=notes /app/dist ./dist

COPY package.json .

COPY yarn.lock .

RUN yarn --production

COPY bin ./bin

COPY public ./public

COPY views ./views

CMD [ "node", "dist/app.js" ]

EXPOSE 4000