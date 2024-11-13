# to run the application
```bash
# backend(port:8088)
mvn clean install
mvn spring-boot:run
# OR
java -jar target/tft-api-wrapper-1.0-SNAPSHOT.jar

# frontend(port:5173) in another terminal
npm run dev
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

