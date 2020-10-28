import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {
  HomeActive,
  HomeNonActive,
  ShopActive,
  ShopNonActive,
  UserActive,
  UserNonActive,
} from '../../../constants/icons';

const widthIcon = 20;
const heightIcon = 20;

const TabItems = ({isFocused, onPress, onLongPress, label}) => {
  function Icon() {
    if (label === 'Home')
      return isFocused ? (
        <HomeActive width={widthIcon} height={heightIcon} />
      ) : (
        <HomeNonActive width={widthIcon} height={heightIcon} />
      );
    if (label === 'Shop')
      return isFocused ? (
        <ShopActive width={widthIcon} height={heightIcon} />
      ) : (
        <ShopNonActive width={widthIcon} height={heightIcon} />
      );
    if (label === 'Account')
      return isFocused ? (
        <UserActive width={widthIcon - 1} height={heightIcon - 1} />
      ) : (
        <UserNonActive width={widthIcon - 1} height={heightIcon - 1} />
      );

    return <HomeActive />;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: (isFocused) => ({
    marginTop: 1,
    color: isFocused ? COLORS.primary : COLORS.black,
    fontSize: SIZES.default,
    fontFamily: isFocused ? FONTS.bold : FONTS.regular,
  }),
});
