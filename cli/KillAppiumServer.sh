#!/usr/bin/env bash
set -u

APPIUM_SERVER_PID=$(lsof -t -i tcp:4723)

if [ -n "$APPIUM_SERVER_PID" ]; then
    kill -9 $APPIUM_SERVER_PID
    echo "Killed Appium Server"
fi
