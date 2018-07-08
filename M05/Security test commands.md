# Docker Commands to test the FIWARE Security Generic Enabler (commands for copy and paste)

# Check Docker ist running
!!!

# Check you have changed to the Repository Directory M05
!!!

## Start all service in detached mode
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


# Setup an application in the idm and takes notes:
- OAuth Client-ID
- OAuth Client Secret
- PEP-Proxy Application ID
- PEP-Proxy Username
- PEP-Proxy Password


# Edit the PEP-Proxy config.js file
## Download the template for an PEP-Proxy config file from the container
docker cp pep-proxy:/opt/fiware-pep-proxy/config.js.template ./PEP-config.js

## Edit the file as shown with a local Texteditor, here it is nano
nano PEP-config.js

## Upload the changed file back into the container
docker cp ./PEP-config.js idm:/opt/fiware-idm/config.js

## Restart the the service pep-proxy
docker-compose restart pep-proxy


## Stop all service and remove all containers from detached mode
docker-compose down
