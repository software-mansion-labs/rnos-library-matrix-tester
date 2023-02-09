#!/usr/bin/env bash
set -u

METRO_BUNDLER_PID=$(lsof -t -i tcp:8081)

if [ -n "$METRO_BUNDLER_PID" ]; then
    kill -9 $METRO_BUNDLER_PID
    echo "Killed Metro Bundler"
fi
