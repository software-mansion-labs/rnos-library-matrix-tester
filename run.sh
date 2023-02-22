#!/usr/bin/env bash
set -u
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# matrix parameters, feel free to tweak these values for local testing
export E2E_REACT_NATIVE_VERSION=0.71.2
export E2E_ARCHITECTURE=Paper
export E2E_RUNTIME=Hermes
export E2E_MODE=debug
export E2E_PLATFORM=iOS

# app and simulator config, please don't change unless something doesn't work
export E2E_IOS_SIMULATOR_NAME="iPhone 14 Pro"
export E2E_IOS_SIMULATOR_VERSION=16.2
export E2E_APP_NAME=MyApp
export E2E_APP_PATH=$SCRIPT_DIR/$E2E_APP_NAME

# workflow for local testing, feel free to comment out unnecessary tasks
echo "Started" && cd $SCRIPT_DIR/cli && \
    ./ValidateConfig.sh && \
    ./RemoveApp.sh && \
    ./CreateApp.sh && \
    ./CopyAppFiles.sh && \
    ./EditPackageJson.sh && \
    ./InstallYarnDependencies.sh && \
    ./LintWithPrettier.sh && \
    ./LintWithESLint.sh && \
    ./CheckTypes.sh && \
    ./SelectArchitecture.sh && \
    ./SelectRuntime.sh && \
    ./IncreaseJavaHeapSize.sh && \
    ./InstallPods.sh && \
    ./LaunchMetroBundler.sh && \
    ./LaunchAppiumServer.sh && \
    ./BuildApp.sh && \
    ./InstallWebDriverAgentRunner.sh && \
    ./RunTests.sh && \
    ./KillAppiumServer.sh && \
    ./KillMetroBundler.sh && \
    echo "Finished"

# TODO: fix Android emulator kill
