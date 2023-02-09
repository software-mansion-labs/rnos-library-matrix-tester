import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Button, StyleSheet, View} from 'react-native';

import React from 'react';
import {testProps} from '../utils';

export function AnimateWidth() {
  const width = useSharedValue(100);

  const box = useAnimatedStyle(() => ({width: width.value}));

  const handlePress = () => {
    width.value = withTiming(300, {duration: 150});
  };

  return (
    <>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.box1, box]} {...testProps('box1')} />
        <View style={styles.box2} {...testProps('box2')} />
      </View>
      <Button onPress={handlePress} title="Button" {...testProps('button')} />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 400,
    height: 100,
    flexDirection: 'row',
  },
  box1: {
    backgroundColor: 'red',
  },
  box2: {
    flex: 1,
    backgroundColor: 'lime',
  },
});
