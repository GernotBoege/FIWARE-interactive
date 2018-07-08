# Docker Commands for copy and paste

## Check before starting
- Docker is running
- You have changed to the Repository Directory M04

## Start all containers in detached mode
docker-compose up -d

## Check the root URL of YOUR page in a Browser
- For my example it is: http://130.206.118.215:8000
- Please replace with your individual IP-Address

## Stop all containers from detached mode + clean up images and volumes
docker-compose down
docker rmi $(docker images -q)

## Watch out this command means data loss of data in the volumes
docker volume rm $(docker volume ls -q)
