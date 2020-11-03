import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import {Minus, Plus} from '../../constants/icons';
import {BORDER_RADIUS, FONTS, SIZES} from '../../constants/themes';

const DetailCountButton = ({type}) => {
  const [count, setCount] = useState(1);

  const plusHandle = () => {
    return setCount(count + 1);
  };

  const minusHandle = () => {
    if (count <= 1) {
      return setCount(1);
    } else {
      return setCount(count - 1);
    }
  };

  return (
    <View style={styles.countContainer(type)}>
      <TouchableOpacity style={styles.minus} onPress={() => minusHandle()}>
        <Minus />
      </TouchableOpacity>
      <Text style={styles.countValue}>{count}</Text>
      <TouchableOpacity style={styles.plus} onPress={() => plusHandle()}>
        <Plus />
      </TouchableOpacity>
    </View>
  );
};

export default DetailCountButton;

const styles = StyleSheet.create({
  countContainer: (type) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 136,
    marginLeft: type === 'Mini' ? -18 : 0,
    alignItems: 'center',
    backgroundColor: type === 'Mini' ? 'transparent' : COLORS.greyLight2,
    padding: 5,
    borderRadius: BORDER_RADIUS.small,
    transform: type === 'Mini' ? [{scale: 0.8}] : [{scale: 1}],
  }),
  minus: {
    paddingHorizontal: 6.49,
    paddingVertical: 6.49,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: BORDER_RADIUS.default,
  },
  plus: {
    paddingHorizontal: 6.49,
    paddingVertical: 6.49,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: BORDER_RADIUS.default,
  },
  countValue: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h3,
    textAlign: 'center',
  },
});
