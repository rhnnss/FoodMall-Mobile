import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, ShopCart, Account} from '../screens';
import {BottomTabNavigator} from '../components';

import CardItemDetails from '../screens/CardItemDetails';
import PaymentMethod from '../screens/PaymentMethod';
import FinishPayment from '../screens/FinishPayment';
import CategoryBreakfast from '../screens/MenuCategory/CategoryBreakfast';
import CategoryBeef from '../screens/MenuCategory/CategoryBeef';
import CategoryChicken from '../screens/MenuCategory/CategoryChicken';
import CategoryFish from '../screens/MenuCategory/CategoryFish';
import CategoryIceCream from '../screens/MenuCategory/CategoryIceCream';
import CategorySnacks from '../screens/MenuCategory/CategorySnacks';
import SearchInHome from '../screens/SearchInHome';

import Splash from '../screens/Startup/Splash';
import Login from '../screens/Startup/Login';
import Register from '../screens/Startup/Register';
import AllProduk from '../screens/ScreensOrderAdmin/AllProduk';
import DataPesanan from '../screens/ScreensOrderAdmin/DataPesanan';
import DetailPesanan from '../screens/ScreensOrderAdmin/DetailPesanan';
import FinishSendToKurir from '../screens/ScreensOrderAdmin/FinishSendToKurir';
import DashboardOrderAdmin from '../screens/ScreensOrderAdmin/DashboardOrderAdmin';
import Produk from '../screens/ScreensOrderAdmin/Produk';
import UpdateProduct from '../screens/ScreensOrderAdmin/UpdateProduct';
import DashboardCourier from '../screens/ScreensCourierAdmin/DashboardCourier';

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
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Homeless"
        component={Home}
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
      <Stack.Screen
        name="SearchInHome"
        component={SearchInHome}
        options={{headerShown: false}}
      />

      {/* ---------------------- Order Admin ---------------------- */}
      <Stack.Screen
        name="AllProduk"
        component={AllProduk}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DataPesanan"
        component={DataPesanan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPesanan"
        component={DetailPesanan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FinishSendToKurir"
        component={FinishSendToKurir}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardOrderAdmin"
        component={DashboardOrderAdmin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Produk"
        component={Produk}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardCourier"
        component={DashboardCourier}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
