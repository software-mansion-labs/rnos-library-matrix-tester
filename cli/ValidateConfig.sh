#!/usr/bin/env bash
set -u

echo E2E_REACT_NATIVE_VERSION=$E2E_REACT_NATIVE_VERSION
if [[ -z "$E2E_REACT_NATIVE_VERSION" ]]; then
    echo 'Missing $E2E_REACT_NATIVE_VERSION' && exit 1
fi

echo E2E_ARCHITECTURE=$E2E_ARCHITECTURE
if [[ -z "$E2E_ARCHITECTURE" ]]; then
    echo 'Missing $E2E_ARCHITECTURE' && exit 1
fi
if [[ $E2E_ARCHITECTURE != "Paper" && $E2E_ARCHITECTURE != "Fabric" ]]; then
    echo 'Invalid $E2E_ARCHITECTURE, must be "Paper" or "Fabric"' && exit 1
fi

echo E2E_RUNTIME=$E2E_RUNTIME
if [[ -z "$E2E_RUNTIME" ]]; then
    echo 'Missing $E2E_RUNTIME' && exit 1
fi
if [[ $E2E_RUNTIME != "JSC" && $E2E_RUNTIME != "Hermes" ]]; then
    echo 'Invalid $E2E_RUNTIME, must be "JSC" or "Hermes"' && exit 1
fi

echo E2E_MODE=$E2E_MODE
if [[ -z "$E2E_MODE" ]]; then
    echo 'Missing $E2E_MODE' && exit 1
fi
if [[ $E2E_MODE != "debug" && $E2E_MODE != "release" ]]; then
    echo 'Invalid $E2E_MODE, must be "debug" or "release"' && exit 1
fi

echo E2E_PLATFORM=$E2E_PLATFORM
if [[ -z "$E2E_PLATFORM" ]]; then
    echo 'Missing $E2E_PLATFORM' && exit 1
fi
if [[ $E2E_PLATFORM != "Android" && $E2E_PLATFORM != "iOS" ]]; then
    echo 'Invalid $E2E_PLATFORM, must be "Android" or "iOS"' && exit 1
fi

echo E2E_APP_NAME=$E2E_APP_NAME
if [[ -z "$E2E_APP_NAME" ]]; then
    echo 'Missing $E2E_APP_NAME' && exit 1
fi

if [[ $E2E_PLATFORM == "iOS" ]]; then
    echo E2E_IOS_SIMULATOR_NAME=$E2E_IOS_SIMULATOR_NAME
    if [[ -z "$E2E_IOS_SIMULATOR_NAME" ]]; then
        echo 'Missing $E2E_IOS_SIMULATOR_NAME' && exit 1
    fi

    echo E2E_IOS_SIMULATOR_VERSION=$E2E_IOS_SIMULATOR_VERSION
    if [[ -z "$E2E_IOS_SIMULATOR_VERSION" ]]; then
        echo 'Missing $E2E_IOS_SIMULATOR_VERSION' && exit 1
    fi
fi

echo E2E_APP_PATH=$E2E_APP_PATH
if [[ -z "$E2E_APP_PATH" ]]; then
    echo 'Missing $E2E_APP_PATH' && exit 1
fi
