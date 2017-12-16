#!/bin/bash
# SIGTERM handler
handler() {
  if [ $API_PID -ne 0 ]; then # 0 is the docker entrypoint
    # tell the node processes to gracefully shut down
    kill -SIGTERM "$API_PID"
    kill -SIGTERM "$APP_PID"

    # wait for the processes to die
    wait "$API_PID"
    wait "$APP_PID"
  fi
  exit 143 # 128 + 15 = SIGTERM
}

# setup callback handler
trap 'kill ${!}; handler' SIGTERM

if [ "$NODE_ENV" = "production" ]; then
  # todo: setup a reverseproxy to serve static files and API

  echo "Running in production mode..."
  ./node_modules/.bin/ts-node src/api/server.ts &
elif [ "$NODE_ENV" = "development" ]; then
  echo "Running in development mode..."

  while ! nc -z database 3306
  do
    echo "Waiting for MySQL to initialize..."
    sleep 2
  done
  echo "MySQL connection test succeeded"

  # echo "Running migrations..."
  # ./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migrations:run

  echo "Starting TS server"
  # Start api in development mode
  ./node_modules/.bin/nodemon --inspect=9222 --exec ./node_modules/.bin/ts-node --no-cache src/api/server.ts &

  API_PID="$!"
  echo "API process $API_PID spawned"

  # Start app in development mode
  npm run start-app &
  APP_PID="$!"
  echo "APP process $APP_PID spawned"
fi

# wait forever
while true
do
  tail -f /dev/null & wait ${!}
done
