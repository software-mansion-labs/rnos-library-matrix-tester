import {Platform} from 'react-native';

export function testProps(testID: string) {
  return Platform.OS === 'ios'
    ? {testID, accessible: false}
    : {accessible: true, accessibilityLabel: testID};
}
