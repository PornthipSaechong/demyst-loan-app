#!/bin/bash
echo "remove python-back containers"
docker stop python-back
docker rm python-back

echo "remove python-back image"
docker image rm back-end:latest

echo "starting back-end engine"
docker build -t back-end:latest .
docker run --name python-back -d -p 5000:5000 back-end:latest
