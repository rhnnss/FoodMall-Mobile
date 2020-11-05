import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {Bank, Cash, Ceriamart, PaymentMethod} from '../../constants/icons';
import {BORDER_RADIUS} from '../../constants/themes';

const PaymentVia = ({via, status}) => {
  const Icon = () => {
    if (via === 'Bank') {
      return <Bank width={38} height={38} />;
    }
    if (via === 'Ceriamart') {
      return <Ceriamart width={38} height={38} />;
    }
    if (via === 'Cash') {
      return <Cash width={38} height={38} />;
    }
  };

  return (
    <TouchableOpacity style={styles.container(status)}>
      <View style={styles.icon}>
        <Icon />
      </View>
      <View>
        <Text style={styles.label}>Payment via {via}</Text>
        <Text style={styles.value}>{via}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentVia;

const styles = StyleSheet.create({
  container: (status) => ({
    flexDirection: 'row',
    paddingVertical: 22,
    paddingLeft: 23,
    backgroundColor: status === true ? COLORS.primary : COLORS.secondary,
    borderRadius: BORDER_RADIUS.regular,
    alignItems: 'center',
    marginBottom: 14,
  }),
  icon: {
    marginRight: 27,
  },
  label: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.default,
  },
  value: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
  },
});
