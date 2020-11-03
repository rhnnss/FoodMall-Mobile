import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, ShopCart, Account} from '../screens';
import {BottomTabNavigator} from '../components';
import CardItemDetails from '../screens/CardItemDetails';
import Products from '../components/Products';
import {enableScreens} from 'react-native-screens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bagian Tab
const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={ShopCart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

// Bagian Tampilan
const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
