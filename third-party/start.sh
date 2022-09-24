#!/bin/bash

echo "starting xero engine"
cd xero
docker build -t xero-third-party:latest .
docker run --name xero-back -d -p 5001:5001 xero-third-party:latest
cd ..

echo "starting myob engine"
cd myob
docker build -t myob-third-party:latest .
docker run --name myob-back -d -p 5002:5002 myob-third-party:latest
cd ..

echo "starting decision engine"
cd decision
docker build -t decision-third-party:latest .
docker run --name decision-back -d -p 5003:5003 decision-third-party:latest
cd ..


