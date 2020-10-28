import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {
  CategoryKebab,
  CategoryNasduk,
  CategoryBurger,
} from '../../constants/icons';

const IconWidth = 30;
const IconHeight = 30;

const CategorySlider = ({name}) => {
  function Icon() {
    if (name === 'Burger')
      return <CategoryBurger width={IconWidth} height={IconHeight} />;
    if (name === 'Nasi Uduk')
      return <CategoryNasduk width={IconWidth} height={IconHeight} />;
    if (name === 'Kebab')
      return <CategoryKebab width={IconWidth} height={IconHeight} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Icon />
        <Text style={styles.labelButton}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategorySlider;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,

    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginRight: 20,
  },
  labelButton: {
    marginLeft: 5,
    fontFamily: FONTS.medium,
    fontSize: SIZES.body1,
    color: COLORS.black,
  },
});
