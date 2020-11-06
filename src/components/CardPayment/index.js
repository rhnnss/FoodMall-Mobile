import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Badge, colors} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES} from '../../constants';
import {Visa} from '../../constants/icons';
import {BORDER_RADIUS} from '../../constants/themes';

const CardPayment = ({type}) => {
  let initialState = [
    {
      id: 1,
      type: 'Visa',
      numberCard: '8080 0896 2004 4956',
      company: 'PT DARLENE SHOP',
    },
    {
      id: 2,
      type: 'MasterCard',
      numberCard: '5374 9890 7844 7951',
      company: 'PT DARLENE SHOP',
    },
    {
      id: 3,
      type: 'Mandiri',
      numberCard: '3499 8409 1253 612',
      company: 'PT DARLENE SHOP',
    },
  ];

  const [DataSource, setDataSource] = useState(initialState);

  const color = (type) => {
    if (type === 'Visa') {
      return COLORS.greenLinear;
    }
    if (type === 'MasterCard') {
      return COLORS.yellowLinear;
    }
    if (type === 'Mandiri') {
      return COLORS.redLinear;
    }
  };

  const item = DataSource.map((val, id) => {
    console.log(val.type);
    return (
      <LinearGradient
        colors={color(val.type)}
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        key={id}>
        <View style={styles.header}>
          <Visa width={80} height={25} />
          <View style={styles.miniCircle}>
            <Badge status="white" />
            <Badge status="white" />
            <Badge status="white" />
          </View>
        </View>
        <View>
          <Text style={styles.noRekening}>{val.numberCard}</Text>
          <Text style={styles.labelCardHolder}>CARD HOLDER</Text>
          <Text style={styles.valueCardHolder}>{val.company}</Text>
        </View>
      </LinearGradient>
    );
  });

  return <View style={{flexDirection: 'row'}}>{item}</View>;
};

export default CardPayment;

const styles = StyleSheet.create({
  linearGradient: {
    width: 320,
    height: 178,
    borderRadius: BORDER_RADIUS.default,
    padding: 20,
    marginRight: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  miniCircle: {
    width: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noRekening: {
    fontFamily: FONTS.SarabunRegular,
    color: COLORS.white,
    fontSize: SIZES.h1,
    marginTop: 20,
  },
  labelCardHolder: {
    fontFamily: FONTS.SarabunLight,
    color: COLORS.white,
    fontSize: SIZES.body1,
    marginTop: 10,
  },
  valueCardHolder: {
    fontFamily: FONTS.SarabunMedium,
    color: COLORS.white,
    marginTop: -10,
    fontSize: SIZES.body3,
  },
});
