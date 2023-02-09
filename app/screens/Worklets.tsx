import {Button, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {runOnJS, runOnUI} from 'react-native-reanimated';

import {testProps} from '../utils';

declare const _WORKLET: boolean;

function assert(condition: boolean) {
  'worklet';
  if (!condition) {
    throw new Error('Test failed');
  }
}

export function Worklets() {
  const [text, setText] = useState('?');

  const someFunction = (x: string) => {
    assert(_WORKLET === false);
    assert(x === '456');
    setText('OK');
  };

  const someWorklet = (x: string) => {
    'worklet';
    assert(_WORKLET === true);
    assert(x === '123');
    runOnJS(someFunction)('456');
  };

  const handlePress = () => {
    assert(_WORKLET === false);
    runOnUI(someWorklet)('123');
  };

  return (
    <>
      <Text {...testProps('text')} style={styles.text}>
        {text}
      </Text>
      <Button onPress={handlePress} title="Button" {...testProps('button')} />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
