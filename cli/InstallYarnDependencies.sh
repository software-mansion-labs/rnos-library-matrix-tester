#!/usr/bin/env bash
set -u
REACT_NATIVE_MINOR_VERSION=$(cut -d '.' -f 2,2 <<< $E2E_REACT_NATIVE_VERSION)

cd $E2E_APP_PATH

# install SWM libraries
yarn add \
    file:../react-native-reanimated-3.0.0.tgz \
    react-native-gesture-handler@2.9.0 \
    yarn add react-native-screens@3.20.0 \
    yarn add react-native-svg@13.8.0

# install linters
yarn add --dev prettier

# install TypeScript (https://reactnative.dev/docs/typescript)
if [ $REACT_NATIVE_MINOR_VERSION -le 70 ]; then
    yarn add --dev @tsconfig/react-native @types/jest @types/react @types/react-test-renderer @types/react-native typescript
fi

# install E2E testing tools
yarn add appium webdriverio@7

# install other libraries
if [ $REACT_NATIVE_MINOR_VERSION -ge 65 ]; then
    RNSAC_VERSION=4.5.0
else
    RNSAC_VERSION=3.4.1
fi
yarn add react-native-safe-area-context@$RNSAC_VERSION
