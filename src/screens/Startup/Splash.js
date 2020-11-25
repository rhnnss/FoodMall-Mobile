import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {LogoSplash} from '../../constants/icons';

const Splash = ({navigation}) => {
  const _validasiSession = async () => {
    const token = await AsyncStorage.getItem('@user_token');
    const usernameItem = await AsyncStorage.getItem('@username');
    if (token && usernameItem) {
      alert(`Welcome Back ${usernameItem}`);
      // How to access screen on between navigator this is different from sending data between screen
      // use object screen with contain the screen name
      // to send new params you must make a new object with the value an object ... and value from params you want to send

      if (usernameItem === 'admin') {
        return navigation.navigate('DashboardOrderAdmin', {
          username: usernameItem,
        });
      } else if (usernameItem === 'courier') {
        return navigation.navigate('DashboardCourier', {
          username: usernameItem,
        });
      } else {
        return navigation.navigate('MainApp', {
          screen: 'Home',
          params: {username: usernameItem},
        });
      }
    } else {
      navigation.navigate('Register');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      _validasiSession();
    }, 2000);
  }, []);
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <LogoSplash width={140} height={180} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
