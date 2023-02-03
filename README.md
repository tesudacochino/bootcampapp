# bootcampapp

Deploy 

docker compose up -d
```
version: '3.3'

services:
  server:
    image: molero/bootcamp-backend:latest
    container_name: myapp-node-server
    command: /usr/src/app/node_modules/.bin/nodemon server.js
    ports:
      - "8081:8080"
    depends_on:
      - mongo
    environment:
      - MONGO_HOSTNAME=mongo
      - MONGO_DB=myapp_db
      - MONGO_PORT=27017

  mongo:
    image: mongo:4.4.18
    ports:
      - "27017:27017"

  client:
    image: molero/bootcamp-frontend:latest
    stdin_open: true
    container_name: myapp-react-client
    depends_on:
      - server
    ports:
      - "3000:3000"
      ```
