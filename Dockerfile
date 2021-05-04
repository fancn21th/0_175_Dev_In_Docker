FROM node:16
WORKDIR /app
COPY package.json .
RUN yarn install 
COPY . .
ENV PORT 3000
EXPOSE $PORT
CMD ["yarn", "dev"]

