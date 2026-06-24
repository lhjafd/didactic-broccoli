#!/bin/bash

set -e

echo "building..."

docker compose down --remove-orphans
docker compose build
docker compose up -d

echo "build complete. running containers: "
docker compose ps