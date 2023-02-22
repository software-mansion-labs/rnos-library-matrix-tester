#!/usr/bin/env bash
set -u
REACT_NATIVE_MINOR_VERSION=$(cut -d '.' -f 2,2 <<< $E2E_REACT_NATIVE_VERSION)

cd $E2E_APP_PATH

# install patch-package
yarn add --dev patch-package postinstall-postinstall || exit 1

# install SWM libraries
yarn add \
    software-mansion/react-native-reanimated#9fe5c8afe55b070ad9f091c498f1b24ad7795f7a \
    react-native-gesture-handler@2.9.0 \
    yarn add react-native-screens@3.19.0 \
    yarn add react-native-svg@13.7.0 \
    || exit 1

# install other libraries
if [ $REACT_NATIVE_MINOR_VERSION -ge 65 ]; then
    RNSAC_VERSION=4.5.0
else
    RNSAC_VERSION=3.4.1
fi
yarn add react-native-safe-area-context@$RNSAC_VERSION || exit 1

# install linters
yarn add --dev prettier || exit 1

# install TypeScript (https://reactnative.dev/docs/typescript)
if [ $REACT_NATIVE_MINOR_VERSION -le 70 ]; then
    yarn add --dev @tsconfig/react-native @types/jest @types/react @types/react-test-renderer @types/react-native typescript || exit 1
fi

# install E2E testing tools
yarn add appium webdriverio@7 || exit 1
