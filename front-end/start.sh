#!/bin/bash
echo "remove reactjs-front containers"
docker stop reactjs-front
docker rm reactjs-front

echo "starting reactjs-front engine"
docker build -t front-end:latest .
docker run --name reactjs-front -d -p 3000:3000 front-end:latest
