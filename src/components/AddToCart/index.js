import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {BORDER_RADIUS} from '../../constants/themes';

const AddToCart = ({addItemToCart, id}) => {
  return (
    <TouchableOpacity style={styles.addCart} onPress={() => addItemToCart(id)}>
      <Text style={styles.label}>Add To Cart</Text>
    </TouchableOpacity>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  addCart: {
    paddingVertical: 14,
    paddingHorizontal: 135,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: BORDER_RADIUS.regular,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h3,
    textAlign: 'center',
    color: COLORS.white,
  },
});
