#!/usr/bin/env bash
set -u

cd $E2E_APP_PATH
yarn tsc --noEmit
