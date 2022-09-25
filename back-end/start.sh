#!/bin/bash
echo "starting back-end engine"
docker build -t back-end:latest .
docker run --name python-back -d -p 5000:5000 pornthipsc/demyst-assessment:back-end
