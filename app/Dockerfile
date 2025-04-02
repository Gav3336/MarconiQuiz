FROM node:22.13.1

EXPOSE 4200

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN npm install

CMD ["ng", "serve"]