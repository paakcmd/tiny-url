#!/bin/sh
set -e

if [ "$1" = 'start' ]; then

  echo "Initializing NodeJS..."
  exec node ./server/bin/www.js NODE_ENV=${NODE_ENV}
#  exec pm2-runtime start /src/pm2-config.json --env ${NODE_ENV}

else
  exec "$@"
fi
