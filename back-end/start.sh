#!/bin/bash
echo "starting back-end engine"
docker build -t back-end:latest .
docker run --name python-back -d -p 5000:5000 back-end:latest
