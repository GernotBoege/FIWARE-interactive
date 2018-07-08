# Docker Commands for copy and paste

# Check before starting
- Docker is running
- You have changed to the Repository Directory M05


# Start all containers in detached mode
docker-compose up -d


# Edit the IDM config.js file
## Download the template for an IDM config file from the container
docker cp idm:/opt/fiware-idm/config.js.template ./IDM-config.js

## Edit the file as shown with a local Texteditor, here it is nano
nano IDM-config.js

## Upload the changed file back into the container
docker cp ./IDM-config.js idm:/opt/fiware-idm/config.js

## Restart the the service idm
docker-compose restart idm


# Edit the PEP-Proxy config.js file
## Download the template for an PEP-Proxy config file from the container
docker cp pep-proxy:/opt/fiware-pep-proxy/config.js.template ./PEP-config.js

## Edit the file as shown with a local Texteditor, here it is nano
nano PEP-config.js

## Upload the changed file back into the container
docker cp ./PEP-config.js idm:/opt/fiware-idm/config.js

## Restart the the service pep-proxy
docker-compose restart pep-proxy


# Stop all containers from detached mode
docker-compose down
