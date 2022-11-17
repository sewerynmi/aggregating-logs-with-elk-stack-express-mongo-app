# Logging Express+MonggoDB API logs with ELK stack

Aggregating all logs from Express app and Mongo DB with Kibana

## Running app

`docker compose up -d`

## Kibana URL

`http://localhost:5601/`

## Kibana index pattern

`mynodeapp-*`

## Read this

- Kibana startup takes time. Yesss !

- You can develop app while running it as docker container. Just observe logs. Must be connected to MongdoDB

- You don't have to run `docker compose down` if you neet to make any changes to Express app or Mongo DB.

- You can stop just Express app or mongo container in docker to save time on Kibana startup.

## Endpoints

`http://localhost:3000/user`

- POST with JSON body `{ "fname": "Timmy", "lname": "Cracks", "age": 33 }`
- GET

`http://localhost:3000/user/:userId`

- `:userId` is user \_id from mongo
