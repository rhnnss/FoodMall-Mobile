import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LogoSplash} from '../constants/icons';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 2000);
  }, [navigation]);
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <LogoSplash width={140} height={180} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
