import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Button, StyleSheet} from 'react-native';

import React from 'react';
import {testProps} from '../utils';

export function AnimateBackgroundColor() {
  const sv = useSharedValue(0);

  const box = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(sv.value, [0, 1], ['red', 'lime']);
    return {backgroundColor};
  });

  const handlePress = () => {
    sv.value = withTiming(1, {duration: 500});
  };

  return (
    <>
      <Animated.View style={[styles.box, box]} {...testProps('box')} />
      <Button onPress={handlePress} title="Button" {...testProps('button')} />
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'black',
  },
});
