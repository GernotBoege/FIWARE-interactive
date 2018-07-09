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
## Now, we don't have to do any changes
## Save the file after having made andy changes
nano IDM-config.js

## Upload the changed file back into the container
docker cp ./IDM-config.js idm:/opt/fiware-idm/config.js

## Restart the the service idm
docker-compose restart idm


# Setup an application in the idm and take notes:
## Call the IDM in the Browser
- For my example it is: http://130.206.118.215:3000 (Change to your individual IP-Address)

## Login into IDM with prepared Admin-User for demo use
- User: admin@test.com
- Password: 1234

## Register a new Application for the demo app
- -> Button Application Register
- Name: Test
- Description: Test Description
- URL: http://130.206.118.215 - URL of YOUR Application that wants to access Data via PEP-Proxy with OAuth2
- Callback URL: http://130.206.118.215/login - URL of YOUR Application for redirection after OAuth2 login
- Grant Type: Unchanged: All different OAuth2 variants are OK
- Provider: For now we have only user admin and this can't be changed
- -> Button Next
- -> Button Next
- -> Button Finish

## Note OAuth2 Credentials
- -> Click Link OAuth2 Credentials
- OAuth Client ID: ee9f0db7-4fa6-4662-a208-cc4b5e096892
- OAuth Client Secret: 0608df0c-f3cb-42cd-90cd-6d60854f39b8

## Note YOUR! PEP Proxy OAuth2 Credentials
- -> Click Link PEP Proxy
- -> Button Register a new PEP Proxy
- Application Id: ee9f0db7-4fa6-4662-a208-cc4b5e096892
- PEP Proxy Username: pep_proxy_e936e959-6966-4c5f-b578-229a129c2022
- PEP Proxy Password: pep_proxy_6dc669bf-9ee9-4923-b668-a056a93f0736


# Edit the PEP-Proxy config.js file
## Download the template for an PEP-Proxy config file from the container
docker cp pep-proxy:/opt/fiware-pep-proxy/config.js.template ./PEP-config.js

## Edit the file as shown with a local Texteditor, here it is nano
nano PEP-config.js
- Change config.pep_port to 1027 (for proxying Orion Context Broker)
- Change idm.host to '172.18.1.5' (internal docker IP for IDM, could also be an external Public IP)
- Change idm.host to 3000 (the IDM Port for ssl=false)
- Change idm.ssl to false (we have not activated ssl in IDM config)
- Change app.host to '172.18.1.7' (internal docker IP for Orion, could also be an external Public IP)
- Change app.port to 1026 (the Orion Port)

## Insert YOUR! PEP Proxy Credentials
- Insert pep.app_id: see above
- Insert pep.username: see above
- Insert pep.password: see above

## Insert YOUR! Magic key if wanted
- Insert magic_key: 1234

## Upload the changed file back into the container
docker cp ./PEP-config.js pep-proxy:/opt/fiware-pep-proxy/config.js

## Restart the the service pep-proxy
docker-compose restart pep-proxy

## Start Postman
## Open API Call B0
- Got to Headers table
- Deactivate X-Auth-Token Parameter
- -> Button Send
- -> Error: "Auth-token not found in request header"

## Open API Call A2 and retrieve OAuth2 Token from IDM on Authorization tab (simulated application Authorization)
- Choose type Basic Auth (this is the simplest of the available OAuth2 variants)
- Username: Insert OAuth Client ID: see above
- Password: Insert OAuth Client Secret: see above
- -> Button Preview Request

## Check tabs Headers and Body
- Headers: Now there are 2 Headers, Authorization has just be generated. Nothing to do
- Body: All prefilled user data for the request itself
- -> Button Send
- -> Copy content of access_token

## Open API Call B0 and go to Headers tab
- Activate X-Auth-Token Parameter
- Insert the just copied OAuth2 access_token in Headers tab into X-Auth-Token
- -> Button Send
- -> Now we receive the proxied version data on port 1027 from Orion Context Broker on port 1026
- -> SUCCESS with Authorization Level 1

## Stop all service and remove all containers from detached mode
docker-compose down
