# Docker Commands to install Wordpress with docker-compose (commands for copy and paste)

# Check Docker ist running
!!!

# Check you have changed to the Repository Directory M04
!!!

## Start all containers in detached mode
docker-compose up -d

## Check the root URL of YOUR page in a Browser
- For my example it is: http://130.206.118.215:8000 (Change to your individual IP-Address)

## Stop ALL containers from detached mode + clean up images and volumes
docker-compose down
