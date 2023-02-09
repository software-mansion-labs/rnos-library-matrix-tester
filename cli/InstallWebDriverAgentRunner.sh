#!/usr/bin/env bash
set -u

if [ $E2E_PLATFORM == "iOS" ]; then
    cd $E2E_APP_PATH && \
    cd ./node_modules/appium-webdriveragent && \
    unzip -o WebDriverAgentRunner-Runner.app.zip -d WebDriverAgentRunner-Runner.app && \
    xcrun simctl install "$E2E_IOS_SIMULATOR_NAME" WebDriverAgentRunner-Runner.app && \
    xcrun simctl launch "$E2E_IOS_SIMULATOR_NAME" com.facebook.WebDriverAgentRunner.xctrunner
fi
