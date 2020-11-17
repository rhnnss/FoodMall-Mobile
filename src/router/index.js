import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, ShopCart, Account} from '../screens';
import {BottomTabNavigator} from '../components';
import CardItemDetails from '../screens/CardItemDetails';
import PaymentMethod from '../screens/PaymentMethod';
import FinishPayment from '../screens/FinishPayment';
import Splash from '../screens/Splash';
import CategoryBreakfast from '../screens/MenuCategory/CategoryBreakfast';
import CategoryBeef from '../screens/MenuCategory/CategoryBeef';
import CategoryChicken from '../screens/MenuCategory/CategoryChicken';
import CategoryFish from '../screens/MenuCategory/CategoryFish';
import CategoryIceCream from '../screens/MenuCategory/CategoryIceCream';
import CategorySnacks from '../screens/MenuCategory/CategorySnacks';

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
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
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
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FinishPayment"
        component={FinishPayment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryBreakfast"
        component={CategoryBreakfast}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryBeef"
        component={CategoryBeef}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryChicken"
        component={CategoryChicken}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryFish"
        component={CategoryFish}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryIceCream"
        component={CategoryIceCream}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategorySnacks"
        component={CategorySnacks}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
