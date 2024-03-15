import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainAppStack from './Stack/MainAppStack';

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <MainAppStack />
    </NavigationContainer>
  );
}
