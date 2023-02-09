import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureStateManager,
  GestureTouchEvent,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
} from 'react-native-gesture-handler';

import React from 'react';
import {StyleSheet} from 'react-native';
import {testProps} from '../utils';

function Ball() {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({x: 0, y: 0});

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value.x}, {translateY: offset.value.y}],
      backgroundColor: isPressed.value ? 'lime' : 'red',
    };
  });

  const gesture = Gesture.Pan()
    .manualActivation(true)
    .onBegin(() => {
      'worklet';
      isPressed.value = true;
    })
    .onChange((e: GestureUpdateEvent<PanGestureChangeEventPayload>) => {
      'worklet';
      offset.value = {
        x: e.changeX + offset.value.x,
        y: e.changeY + offset.value.y,
      };
    })
    .onFinalize(() => {
      'worklet';
      isPressed.value = false;
    })
    .onTouchesMove((e: GestureTouchEvent, state: GestureStateManager) => {
      state.activate();
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.ball, animatedStyles]}
        {...testProps('ball')}
      />
    </GestureDetector>
  );
}

export function GestureHandlerDragDrop() {
  return <Ball />;
}

const styles = StyleSheet.create({
  ball: {
    width: 200,
    height: 200,
    marginTop: -100, // compensate for paddingVertical
    backgroundColor: 'blue',
  },
});
