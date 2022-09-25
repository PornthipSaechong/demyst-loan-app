#!/bin/bash

echo "build and push xero engine"
cd xero
docker build -t pornthipsc/demyst-assessment:xero-back .
docker push pornthipsc/demyst-assessment:xero-back
cd ..

echo "build and push myob engine"
cd myob
docker build -t pornthipsc/demyst-assessment:myob-back .
docker push pornthipsc/demyst-assessment:myob-back
cd ..

echo "build and push decision engine"
cd decision
docker build -t pornthipsc/demyst-assessment:decision-third-party .
docker push pornthipsc/demyst-assessment:decision-third-party
cd ..
