# FOR DEMONSTRATION PURPOSES ONLY!!!

# 00 PORTS TO OPEN IN OPENTACK - SECURITY GROUP
# !!! DO NOT LEAVE OPEN TO PREVENT ABUSE!!!
# FOR THE DEMO APP IN THE DOCKER-COMPOSE FILE
    0 - Ping
    22 - SSH # MUST HAVE FOR DOCKER MACHINE, DO NOT FORGET !!!
    80 - HTTP
    1026 - Orion Context Broker
    2376 - DOCKER # MUST HAVE FOR DOCKER MACHINE, DO NOT FORGET !!!
    3306 - MySQL
    5050 - Cygnus
    8080 - CEP Proton
    8081 - Cygnus
    8082 - SpagoBI (reset)
    27017 - MongoDB


# 01 LOAD ENVIRONMENT VARIABLES
source openrc

# 02 START CREATION OF DOCKER HOST
docker-machine create -d openstack --openstack-flavor-id="3" --openstack-image-name="base_ubuntu_14.04" --openstack-net-name="node-int-net-01" --openstack-floatingip-pool="public-ext-net-01" --openstack-sec-groups="docker-sg" --openstack-ssh-user "ubuntu" docker-host

# 03 MAKE DOCKER COMMANDS RUN AGAINST A DOCKER-MACHINE HOST
eval "$(docker-machine env docker-host)"

# 04 UNSET DOCKER COMMANDS TO RUN AGAINST A DOCKER-MACHINE HOST
docker-machine env -u

# 05 FORCE COMPLETE DELETION OF DOCKER-MACHINE HOST
docker-machine rm docker-host --force

# 06 SSH INTO A DOCKER-MACHINE HOST
docker-machine ssh docker-host

# 07 SHOW ALL DOCKER CONTAINER IN A DOCKER-MACHINE HOST
docker ps

# 08 ENTER THE SHELL OF A SPECIFIC DOCKER CONTAINER AFTER docker ps
docker exec -t -i 62axxxxfa4f2 /bin/bash

# 09 LIST ALL DOCKER IMAGES
docker images

# 10 REMOVE IMAGE WITH ID AFTER COMMAND docker images
docker rmi 4b6xxxx9ef3e

# 11 STOP AND REMOVE ALL CONTAINERS AND IMAGES FROM DOCKER-MACHINE HOST
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)