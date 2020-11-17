import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {
  Ayam,
  Camilan,
  DagingSapi,
  IceCream,
  Ikan,
  SarapanPagi,
} from '../../constants/icons';

const Category = ({title}) => {
  const navigation = useNavigation();

  const Icons = () => {
    if (title === 'Breakfast') return <SarapanPagi />;
    if (title === 'Beef') return <DagingSapi />;
    if (title === 'Chicken Meat') return <Ayam />;
    if (title === 'Fish Meat') return <Ikan />;
    if (title === 'Ice Cream') return <IceCream />;
    if (title === 'Snack') return <Camilan />;
  };

  const NavigationRoute = () => {
    if (title === 'Breakfast') return navigation.navigate('CategoryBreakfast');
    else if (title === 'Beef') return navigation.navigate('CategoryBeef');
    else if (title === 'Chicken Meat')
      return navigation.navigate('CategoryChicken');
    else if (title === 'Fish Meat') return navigation.navigate('CategoryFish');
    else if (title === 'Ice Cream')
      return navigation.navigate('CategoryIceCream');
    else if (title === 'Snack') return navigation.navigate('CategorySnacks');
  };

  return (
    <TouchableOpacity onPress={() => NavigationRoute()}>
      <View style={styles.container}>
        <View style={styles.button}>
          <Icons />
        </View>
        <Text style={styles.label}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 11,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
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
    color: COLORS.grey,
  },
});
