#!/bin/bash

echo "remove python-back containers"
docker stop python-back
docker rm python-back

echo "remove reactjs-front containers"
docker stop reactjs-front
docker rm reactjs-front

echo "remove xero containers"
docker stop xero-back
docker rm xero-back

echo "remove myob containers"
docker stop myob-back
docker rm myob-back

echo "remove decision containers"
docker stop decision-back
docker rm decision-back


echo "remove front-end image"
docker image rm front-end:latest

echo "remove python-back image"
docker image rm back-end:latest

echo "remove xero-third-party image"
docker image rm xero-third-party:latest

echo "remove myob-third-party image"
docker image rm myob-third-party:latest

echo "remove decision-third-party image"
docker image rm decision-third-party:latest

echo "remove network"
docker network rm back-end-network