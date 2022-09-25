#!/bin/bash

echo "build and push front-end image"
docker build -t pornthipsc/demyst-assessment:front-end .
docker push pornthipsc/demyst-assessment:front-end