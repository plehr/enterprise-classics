FROM node:8

WORKDIR /app

COPY package*.json ./

RUN mkdir data
RUN npm install --only-production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
