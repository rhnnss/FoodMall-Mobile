import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {
  Ayam,
  Camilan,
  DagingSapi,
  Ikan,
  Minuman,
  SarapanPagi,
} from '../../constants/icons';

const Category = ({title}) => {
  const Icons = () => {
    if (title === 'Breakfast') return <SarapanPagi />;
    if (title === 'Beef') return <DagingSapi />;
    if (title === 'Chicken Meat') return <Ayam />;
    if (title === 'Fish Meat') return <Ikan />;
    if (title === 'Fresh Drink') return <Minuman />;
    if (title === 'Snack') return <Camilan />;
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.button}>
        <Icons />
      </View>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 11,
  },
  button: {
    borderRadius: 14,
    width: 96,
    height: 96,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 11,
    fontFamily: FONTS.medium,
    fontSize: SIZES.body1,
  },
});
