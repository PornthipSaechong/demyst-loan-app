#!/bin/bash
echo "remove xero containers"
docker stop xero-back
docker rm xero-back

echo "starting xero engine"
cd xero
docker build -t xero-third-party:latest .
docker run --name xero-back -d -p 5001:5001 xero-third-party:latest
cd ..

echo "remove myob containers"
docker stop myob-back
docker rm myob-back

echo "starting myob engine"
cd myob
docker build -t myob-third-party:latest .
docker run --name myob-back -d -p 5002:5002 myob-third-party:latest
cd ..

echo "remove decision containers"
docker stop decision-back
docker rm decision-back

echo "starting decision engine"
cd decision
docker build -t decision-third-party:latest .
docker run --name decision-back -d -p 5003:5003 decision-third-party:latest
cd ..


