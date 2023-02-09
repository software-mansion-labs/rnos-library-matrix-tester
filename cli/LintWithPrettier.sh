#!/usr/bin/env bash
set -u

cd $E2E_APP_PATH
yarn prettier screens App.tsx index.js --check
