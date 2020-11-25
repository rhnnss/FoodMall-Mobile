import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ButtonForOrderAdmin} from '../../components';
import {COLORS, SIZES, FONTS} from '../../constants';

const FinishSendToKurir = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        height: '100%',
      }}>
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.h1,
          color: COLORS.greyLight,
          justifyContent: 'center',
          marginTop: 280,
        }}>
        Sedang dalam pengiriman
      </Text>
      <View style={{marginTop: 200}}>
        <ButtonForOrderAdmin role="ArrowBack" navigate="Home" size="large" />
      </View>
    </View>
  );
};

export default FinishSendToKurir;

const styles = StyleSheet.create({});
