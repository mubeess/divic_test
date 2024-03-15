import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Authentication/Login';

const Stack = createStackNavigator();

function MainAppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default MainAppStack;
