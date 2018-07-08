# FOR DEMONSTRATION PURPOSES ONLY!!!
# !!! DO NOT LEAVE OPEN TO PREVENT ABUSE!!!

## 00 - PORTS TO OPEN IN OPENTACK - SECURITY GROUP
## FOR THE DEMO APP IN THE DOCKER-COMPOSE FILE
    0 - ICMP for Ping
    22 - SSH # MUST HAVE FOR DOCKER MACHINE, DO NOT FORGET !!!
    80 - HTTP
    1026 - Orion Context Broker
    1027 - Proxy Port for Orion Context Broker
    2376 - DOCKER # MUST HAVE FOR DOCKER MACHINE, DO NOT FORGET !!!
    3000 - IDM
    3306 - MySQL
    5050 - Cygnus
    8000 - Wordpress Test
    8080 - CEP Proton
    8081 - Cygnus
    8082 - SpagoBI (changed from default)


## 01 - LOAD ENVIRONMENT VARIABLES
source openrc

## 02 - START CREATION OF DOCKER HOST
docker-machine create -d openstack --openstack-flavor-id="2" --openstack-image-name="base_centos_7" --openstack-net-name="node-int-net-01" --openstack-floatingip-pool="public-ext-net-01" --openstack-domain-id="default" --openstack-ssh-user="centos" --openstack-sec-groups="docker-sg" docker-host

## 03 - MAKE DOCKER COMMANDS RUN AGAINST A DOCKER-MACHINE HOST
eval "$(docker-machine env docker-host)"

## 04 - UNSET DOCKER COMMANDS TO RUN AGAINST A DOCKER-MACHINE HOST
docker-machine env -u

## 05 - SSH INTO A DOCKER-MACHINE HOST
docker-machine ssh docker-host

## 06 - SHOW ALL DOCKER CONTAINER IN A DOCKER-MACHINE HOST
docker ps

## 07 - ENTER THE SHELL OF A SPECIFIC DOCKER CONTAINER
docker exec -i -t idm /bin/bash

## 08 - FORCE COMPLETE DELETION OF DOCKER-MACHINE HOST
docker-machine rm docker-host --force

## 09 Batch commands for ALL containers in the system
### Stop ALL containers
docker stop $(docker ps -a -q)

### Remove ALL containers
docker rm $(docker ps -a -q)

### Remove ALL images
docker rmi $(docker images -q)

### Remove ALL volumes
docker volume rm $(docker volume ls -q)

### Remove ALL networks
docker network rm $(docker network ls -q)
