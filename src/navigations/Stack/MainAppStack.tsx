import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Authentication/Login';
import DashboardBottomTab from '../Tabs/DashboardBottomTab';
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};
const Stack = createStackNavigator();

function MainAppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={DashboardBottomTab} />
    </Stack.Navigator>
  );
}

export default MainAppStack;
