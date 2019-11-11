#!/bin/bash

docker build --build-arg NODE_ENV=prod -t tinyUrl
docker run -e NODE_ENV=prod -p 8081:8081 tinyUrl
