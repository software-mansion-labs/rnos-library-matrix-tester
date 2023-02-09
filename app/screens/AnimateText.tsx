import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Button, StyleSheet, TextInput, TextInputProps} from 'react-native';

import React from 'react';
import {testProps} from '../utils';

Animated.addWhitelistedNativeProps({text: true});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function AnimateText() {
  const sv = useSharedValue(0);

  const text = useDerivedValue(() => {
    return Math.round(sv.value * 100).toString();
  });

  const animatedProps = useAnimatedProps(() => {
    return {text: text.value} as TextInputProps;
  });

  const handlePress = () => {
    sv.value = withTiming(1, {duration: 500});
  };

  return (
    <>
      <AnimatedTextInput
        underlineColorAndroid="transparent"
        editable={false}
        value={text.value}
        animatedProps={animatedProps}
        style={styles.text}
        {...testProps('text')}
      />
      <Button onPress={handlePress} title="Button" {...testProps('button')} />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 100,
  },
});
