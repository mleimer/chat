Simple Chat-App using ReactJS, STOMP, Java SprintBoot with H2-Database containerized in Docker.

## Commands
```docker-compose build``` to build the containers<br>
```docker-compose up``` to start up the containers<br>
```docker-compose down``` to tier down the containers<br>

By default, the development configuration will be taken. To use production configuration, please add argument:
```-f docker-compose.prod.yml```

## Configurations
"docker-compose.yml" containing Docker config for development mode
"docker-compose.prod.yml" containing Docker config for production mode

## Open Points / Next Steps
- Analyze Web-Security / OWASP Top10
- Validation of user entered data
    - UserName (Characters & Length)
    - Message (Characters & Length)
- Simplify/Merge Docker config to prevent having one Dockerfile for each environment

