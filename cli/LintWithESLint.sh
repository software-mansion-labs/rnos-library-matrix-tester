#!/usr/bin/env bash
set -u

cd $E2E_APP_PATH
yarn eslint . --ext .js,.jsx,.ts,.tsx --max-warnings=0
