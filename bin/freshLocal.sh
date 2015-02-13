#!/bin/bash
docker rmi -f pubmow
docker build --rm=true -t pubmow .
docker run -d -t -v $(pwd)/app:/var/www -p 9090:80 pubmow
