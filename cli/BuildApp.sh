#!/usr/bin/env bash
set -u

cd $E2E_APP_PATH

if [ $E2E_PLATFORM == "iOS" ]; then
    if [ $E2E_MODE == "debug" ]; then
        yarn react-native run-ios --configuration Debug --simulator "$E2E_IOS_SIMULATOR_NAME"
    elif [ $E2E_MODE == "release" ]; then
        yarn react-native run-ios --configuration Release --simulator "$E2E_IOS_SIMULATOR_NAME" --no-packager
    fi
elif [ $E2E_PLATFORM == "Android" ]; then
    # TODO: use --active-arch-only in 0.68+
    REACT_NATIVE_MINOR_VERSION=$(cut -d '.' -f 2,2 <<< $E2E_REACT_NATIVE_VERSION)

    if [ $REACT_NATIVE_MINOR_VERSION -ge 71 ]; then
        MODE_ARG_NAME=--mode
    else
        MODE_ARG_NAME=--variant
    fi

    if [ $REACT_NATIVE_MINOR_VERSION -ge 68 ]; then
        ACTIVE_ARCH_ONLY_FLAG=--active-arch-only
    else
        ACTIVE_ARCH_ONLY_FLAG=
    fi

    if [ $E2E_MODE == "release" ]; then
        NO_PACKAGER_FLAG=--no-packager
    else
        NO_PACKAGER_FLAG=
    fi

    yarn react-native run-android \
        $MODE_ARG_NAME=$E2E_MODE \
        $NO_PACKAGER_FLAG \
        $ACTIVE_ARCH_ONLY_FLAG
fi
