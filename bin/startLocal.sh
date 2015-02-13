#!/bin/bash
docker run -d -t -v $(pwd)/app:/var/www -p 9090:80 pubmow
