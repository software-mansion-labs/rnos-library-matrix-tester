#!/usr/bin/env bash
set -u
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

: "${E2E_APP_PATH}" # bound variable

node $SCRIPT_DIR/EditPackageJson.js
