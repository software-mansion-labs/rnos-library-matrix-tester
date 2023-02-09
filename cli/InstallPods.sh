#!/usr/bin/env bash
set -u

if [ $E2E_RUNTIME == "Hermes" ]; then
    export USE_HERMES=1
else
    export USE_HERMES=0
fi

if [ $E2E_ARCHITECTURE == "Fabric" ]; then
    export RCT_NEW_ARCH_ENABLED=1
else
    export RCT_NEW_ARCH_ENABLED=0
fi

if [ $E2E_MODE == "release" ]; then
    export PRODUCTION=1
else
    export PRODUCTION=0
fi

cd $E2E_APP_PATH/ios
pod install
