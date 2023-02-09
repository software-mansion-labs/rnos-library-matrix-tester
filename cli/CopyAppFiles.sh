#!/usr/bin/env bash
set -u
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# overwrite files
cp -a $SCRIPT_DIR/../app/. $E2E_APP_PATH

# remove unnecessary files
cd $E2E_APP_PATH && rm -f .flowconfig App.js __tests__/App-test.js __tests__/App-test.tsx
