import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../../screens/Dashboard/Home/Home';
import {
  AvatarIcon,
  BarcodeScanIcon,
  ShipmentIcon,
  WalletIcon,
} from '../../assets/Svg';
import {colors} from '../../utils/colors';
import ProfileHome from '../../screens/Dashboard/Profile/ProfileHome';
import WalletHome from '../../screens/Dashboard/Wallet/WalletHome';
import ScanHome from '../../screens/Dashboard/Scan/ScanHome';
export type RootTabParamList = {
  Home: undefined;
  Scan: undefined;
  Wallet: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator();
const DashboardBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.gray,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          transform: [{translateY: -10}],
        },

        // @ts-ignore
      }}
      initialRouteName="Home">
      <Tab.Screen
        options={{
          tabBarIcon: props => <ShipmentIcon {...props} />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <BarcodeScanIcon {...props} />,
        }}
        name="Scan"
        component={ScanHome}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <WalletIcon {...props} />,
        }}
        name="Wallet"
        component={WalletHome}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <AvatarIcon {...props} />,
        }}
        name="Profile"
        component={ProfileHome}
      />
    </Tab.Navigator>
  );
};

export default DashboardBottomTab;
