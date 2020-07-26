Simple Chat-App using ReactJS, STOMP, Java SprintBoot with H2-Database containerized in Docker.

## Pre-Requisites
- NodeJS with NPM
- Docker

## Run the application
1. ```docker-compose -f docker-compose.prod.yml build``` to build the containers<br>
2. ```docker-compose -f docker-compose.prod.yml up -d``` to run the containers<br>
3. (http://localhost:3000) to access the application

## Commands
```docker-compose [-f docker-compose.prod.yml] build``` to build the containers \[in production mode\]<br>
```docker-compose [-f docker-compose.prod.yml] up [-d]``` to start up the \[production\] containers \[in detached mode\]<br>
```docker-compose down``` to tier down the containers<br>
Further commands can be found on the [official Docker documentation website](https://docs.docker.com/compose/reference/overview/)

## Configurations
"docker-compose.yml" containing Docker config for development mode
"docker-compose.prod.yml" containing Docker config for production mode

## Open Points / Next Steps
- Analyze Web-Security / OWASP Top10
- Validation of user entered data
    - UserName (Characters & Length)
    - Message (Characters & Length)
- Simplify/Merge Docker config to prevent having one Dockerfile for each environment

