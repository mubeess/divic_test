import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainAppStack from './Stack/MainAppStack';
import Toast from 'react-native-toast-message';
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <MainAppStack />
      <Toast />
    </NavigationContainer>
  );
}
