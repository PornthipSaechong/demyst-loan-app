#!/bin/bash
echo "build and push back-end image"
docker build -t pornthipsc/demyst-assessment:back-end .
docker push pornthipsc/demyst-assessment:back-end