FROM node:22-alpine AS build-node
WORKDIR /app
COPY *.js /app/
COPY package*.json /app/
RUN npm i && npm i -g @vercel/ncc && ncc build index.js -o dist
RUN ls -alh dist

FROM node:22-alpine
WORKDIR /app
COPY --from=build-node /app/dist/index.js /app/index.js
ENV TELEGRAM_TOKEN=enter_your_token
CMD ["node", "index.js"]