# to run the application
```bash
# backend(port:8088) in terminal @ ~/d/b/tft-api-example
mvn clean install
mvn spring-boot:run
# OR
java -jar target/tft-api-wrapper-1.0-SNAPSHOT.jar
# OR 
run the App.java file

# frontend(port:5173) in another terminal @ ~/d/b/tft-api-example/s/m/webapp
npm run dev

# Testing

mvn clean test
```

# future consideration / implementations

for ease of use, I've made this application to display match details from a given matchID which can be pulled by your riotID(multiple matches) or a matchID

you can grab a matchid from the url of your profile on [tactics.tools](https://tactics.tools/player/na/)

```
# real example
https://tactics.tools/player/na/PLAYER/PRIM3/NA1_5107918675

# example with descriptions
https://tactics.tools/player/na/{username}/{usertag}/{matchID_copy_this}
```

## Docker setup (TODO)

```bash
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/tft-api-wrapper-1.0-SNAPSHOT.jar app.jar

EXPOSE 8088

ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "preview"]
```

Docker Compose
```bash
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8088:8088"
    environment:
      - RIOT_API_KEY=get_from_env_var
    depends_on:
      - db

  frontend:
    build:
      context: ./src/main/webapp
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    depends_on:
      - backend

  db:
    image: postgres:14
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: tft
    ports:
      - "5432:5432"
```

