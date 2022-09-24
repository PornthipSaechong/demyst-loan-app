#!/bin/bash

echo "start third-party"
cd third-party
start.sh
cd ..

echo "start back-end"
cd back-end
start.sh
cd ..

echo "start front-end"
cd front-end
start.sh
cd ..

echo "remove network"
docker network rm back-end-network

echo "create docker network"
docker network create back-end-network
docker network connect back-end-network xero-back
docker network connect back-end-network myob-back
docker network connect back-end-network decision-back
docker network connect back-end-network python-back