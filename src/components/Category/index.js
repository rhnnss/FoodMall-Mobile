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
    if (title === 'Sarapan Pagi') return <SarapanPagi />;
    if (title === 'Daging Sapi') return <DagingSapi />;
    if (title === 'Ayam') return <Ayam />;
    if (title === 'Ikan') return <Ikan />;
    if (title === 'Minuman') return <Minuman />;
    if (title === 'Camilan') return <Camilan />;
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
