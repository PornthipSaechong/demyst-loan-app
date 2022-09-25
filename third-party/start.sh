#!/bin/bash

echo "starting xero engine"
cd xero
docker run --name xero-back -d -p 5001:5001 pornthipsc/demyst-assessment:xero-back
cd ..

echo "starting myob engine"
cd myob
docker run --name myob-back -d -p 5002:5002 pornthipsc/demyst-assessment:myob-back
cd ..

echo "starting decision engine"
cd decision
docker run --name decision-back -d -p 5003:5003 pornthipsc/demyst-assessment:decision-third-party
cd ..