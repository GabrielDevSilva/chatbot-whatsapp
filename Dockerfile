FROM node:19

WORKDIR /app

RUN apt-get update && apt-get install -y chromium 


COPY package.json package-lock.json /app/

RUN npm install 

COPY . /app/

ENTRYPOINT [ "npm", "run", "start" ]