import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Button, DevSettings, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {testProps} from '../utils';

export function Reload() {
  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = 0;
    sv.value = withRepeat(withTiming(1), -1, true);
  }, [sv]);

  const box = useAnimatedStyle(() => {
    return {
      backgroundColor: 'lime',
      opacity: sv.value,
    };
  });

  const handlePress = () => {
    DevSettings.reload(); // this is a no-op in release mode
  };

  return (
    <>
      <Animated.View style={[styles.box, box]} />
      <Button title="Reload" onPress={handlePress} {...testProps('button')} />
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});
