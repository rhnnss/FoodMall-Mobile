import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {
  HomeActive,
  HomeNonActive,
  ShopActive,
  ShopNonActive,
  UserActive,
  UserNonActive,
} from '../../../constants/icons';
// import {connect} from 'react-redux';
import {useSelector} from 'react-redux';

const TabItems = ({isFocused, onPress, onLongPress, label}) => {
  const widthIcon = 24;
  const heightIcon = 24;
  const cartItems = useSelector((state) => state);
  // const [count, setCount] = useState(cartItems.length);

  const count = cartItems.length;

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

  const Item = () => {
    return (
      <View style={styles.badge(count)}>
        <Text style={styles.valueBadge}>{count}</Text>
      </View>
    );
  };

  const Badge = () => {
    if (label === 'Shop' && count <= 100) {
      return <Item />;
    } else if (label === 'Shop' && count >= 101) {
      return <Item />;
    }

    return Badge;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Badge />
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItems;

const circleSize = 22;

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
  badge: (count) => ({
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: COLORS.red,
    width: count <= 100 ? circleSize : circleSize * 1.8,
    height: circleSize,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),
  valueBadge: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.default,
    color: COLORS.white,
  },
});
