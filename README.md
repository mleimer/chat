Simple Chat-App using ReactJS, STOMP, Java SprintBoot with H2-Database containerized in Docker.

## Pre-Requisites
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
- Analyze Web-Security of the application in detail and take necessary actions
- Show connection errors in UI
- Simplify & optimize Docker configuration, eg. adding a .dockerignore file

## Choices of Technology

### Backend
  
| Dependency     | Reason                                                    | Identified Risks                                                              |
|----------------|-----------------------------------------------------------|--------------------------------------------------------------------|
| Java           | Backend Technology as preferred in challenge description  |                                                                    | 
| SpringBoot     | Efficiently create Controller, Services and Repository    | Lots of hidden magic                                               |  
| SpringSecurity | Handle general security incl. CORS                        |                                                                    |  
| H2-Database    | Most simple in memory database                            |                                                                    |  
| Mockito        | Simplifying mocking of test classes                       | Inappropriate usage can facilitate violation of SOLID              |
| JUnit5         | To test the application                                   |                                                                    |

### Frontend
| Dependency     | Reason                                                    | Identified Risks                                                              |
|----------------|-----------------------------------------------------------|--------------------------------------------------------------------|
| React          | Efficiently develop Frontend application                  | Lacking support for very old browser versions                      | 
| Material-UI    | Efficient creation of a good-looking, responsive design   | Big UI-framework (decreasing app performance)                      | 
| Cross-Fetch    | To communicate with Backend using REST                    |                                                                    |  
| STOMP.js       | To communicate with Backend using STOMP                   |                                                                    |  
| SockJS         | To communicate with Backend using STOMP                   |                                                                    |  
| Moment         | Transforming dates - Do not reinvent the wheel            | Rather large library, given that there is only one use case so far |  
| Jest           | To test the application                                   |                                                                    |


