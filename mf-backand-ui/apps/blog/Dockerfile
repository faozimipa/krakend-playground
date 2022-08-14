FROM node:lts-alpine
WORKDIR /app
COPY ./apps/blog .
COPY package.json package-lock.json ./
ENV PORT=3002
EXPOSE ${PORT}
RUN npm install --production
RUN npm run start:blog
# CMD node ./main.js