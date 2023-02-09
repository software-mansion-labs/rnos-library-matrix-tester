import {Button, StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {TESTS} from './screens/tests';
import {testProps} from './utils';

export default function App() {
  const [currentTest, setCurrentTest] = React.useState<() => JSX.Element>();

  return (
    <GestureHandlerRootView style={styles.container}>
      {currentTest !== undefined ? (
        <>
          {React.createElement(currentTest)}
          <Button
            title="Menu"
            {...testProps('menu')}
            onPress={() => setCurrentTest(undefined)}
          />
        </>
      ) : (
        TESTS.map(test => (
          <Button
            key={test.name}
            title={test.name}
            {...testProps(test.name)}
            onPress={() => setCurrentTest(() => test.component)}
          />
        ))
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
  },
});
