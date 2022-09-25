#!/bin/bash

echo "start third-party"
docker run --name xero-back -d -p 5001:5001 pornthipsc/demyst-assessment:xero-back
docker run --name myob-back -d -p 5002:5002 pornthipsc/demyst-assessment:myob-back
docker run --name decision-back -d -p 5003:5003 pornthipsc/demyst-assessment:decision-third-party

echo "start back-end"
docker run --name python-back -d -p 5000:5000 pornthipsc/demyst-assessment:back-end

echo "start front-end"
docker run --name reactjs-front -d -p 3000:3000 pornthipsc/demyst-assessment:front-end

echo "remove network"
docker network rm back-end-network

echo "create docker network"
docker network create back-end-network
docker network connect back-end-network xero-back
docker network connect back-end-network myob-back
docker network connect back-end-network decision-back
docker network connect back-end-network python-back