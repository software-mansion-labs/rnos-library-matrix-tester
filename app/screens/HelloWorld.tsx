import {Platform, Text} from 'react-native';

import React from 'react';
import {version as reactNativeGestureHandlerVersion} from 'react-native-gesture-handler/package.json';
import {version as reactNativeReanimatedVersion} from 'react-native-reanimated/package.json';
import {version as reactNativeScreensVersion} from 'react-native-screens/package.json';
import {version as reactNativeSvgVersion} from 'react-native-svg/package.json';
import {version as reactNativeVersion} from 'react-native/package.json';
import {testProps} from '../utils';

function getPlatform() {
  // @ts-ignore
  return Platform.constants.systemName || Platform.constants.Brand;
}

function getPlatformVersion() {
  return Platform.Version;
}

function getMode() {
  return __DEV__ ? 'debug' : 'release';
}

function getRuntime() {
  return 'HermesInternal' in global ? 'Hermes' : 'JSC'; // TODO: V8
}

function getArchitecture() {
  return 'nativeFabricUIManager' in global ? 'Fabric' : 'Paper';
}

export function HelloWorld() {
  return (
    <>
      <Text {...testProps('text')}>Hello world!</Text>
      <Text>React Native version:</Text>
      <Text {...testProps('reactNativeVersion')}>{reactNativeVersion}</Text>
      <Text>Reanimated version: </Text>
      <Text {...testProps('reactNativeReanimatedVersion')}>
        {reactNativeReanimatedVersion}
      </Text>
      <Text>Gesture Handler version: </Text>
      <Text {...testProps('reactNativeGestureHandlerVersion')}>
        {reactNativeGestureHandlerVersion}
      </Text>
      <Text>Screens version: </Text>
      <Text {...testProps('reactNativeScreensVersion')}>
        {reactNativeScreensVersion}
      </Text>
      <Text>SVG version: </Text>
      <Text {...testProps('reactNativeSvgVersion')}>
        {reactNativeSvgVersion}
      </Text>
      <Text>Platform:</Text>
      <Text {...testProps('platform')}>{getPlatform()}</Text>
      <Text>{getPlatformVersion()}</Text>
      <Text>Mode: </Text>
      <Text {...testProps('mode')}>{getMode()}</Text>
      <Text>Architecture:</Text>
      <Text {...testProps('architecture')}>{getArchitecture()}</Text>
      <Text>Runtime:</Text>
      <Text {...testProps('runtime')}>{getRuntime()}</Text>
    </>
  );
}
