#!/bin/bash

echo "starting reactjs-front engine"
docker build -t front-end:latest .
docker run --name reactjs-front -d -p 3000:3000 front-end:latest
