import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Badge} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {CardPayment} from '../components';
import {COLORS, FONTS, SIZES} from '../constants';
import CountDown from 'react-native-countdown-component';
import {Burger} from '../constants/images';
import {BORDER_RADIUS} from '../constants/themes';
import {useNavigation} from '@react-navigation/native';

const FinishPayment = () => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const navigation = useNavigation();

  let initialState = [
    {
      id: 1,
      title: 'Beef Burger Deluxe',
      price: 150000,
    },
    {
      id: 2,
      title: 'Egg and Cheese Muffin',
      price: 56000,
    },
    {
      id: 3,
      title: 'Sausage McMuffin with Egg',
      price: 26000,
    },
  ];

  const [DataSource, setDataSource] = useState(initialState);

  const convertToRupiah = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return (
      'Rp. ' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')
    );
  };

  const Item = DataSource.map((val, id) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
        key={id}>
        <Text style={{fontFamily: FONTS.medium, fontSize: SIZES.body1}}>
          {val.title}
        </Text>
        <Text style={{fontFamily: FONTS.regular, fontSize: SIZES.body1}}>
          {convertToRupiah(val.price)}
        </Text>
      </View>
    );
  });

  let sum = DataSource.reduce((acc, crv) => {
    let all = acc + crv.price;
    return all;
  }, 2500);

  const Total = () => {
    let sum = DataSource.reduce((acc, crv) => {
      let all = acc + crv.price;
      return all;
    }, 2500);

    return (
      <View
        style={{
          justifyContent: 'space-between',
          marginBottom: 5,
          marginTop: 15,
        }}
        key={id}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontFamily: FONTS.medium, fontSize: SIZES.body1}}>
            PPN (Pajak Pertambahan Nilai)
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.body1,
            }}>
            10%
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: SIZES.body1,
            alignSelf: 'flex-end',
          }}>
          {convertToRupiah(sum)}
        </Text>
      </View>
    );
  };

  //--------------------------- Render Container ---------------------------
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Your Payment Deadline</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>Sunday, 27 Sep 2020</Text>
          <Text style={styles.dateTime}>10: 26 WIB</Text>
        </View>
        {/* <Text style={styles.timer}>Hai</Text> */}
        <CountDown
          style={{marginLeft: deviceWidth * -0.52}}
          size={20}
          until={86400}
          onFinish={() => alert('Maaf Melebihi Batas Waktu')}
          onPress={() => alert('Segera Selesaikan Pembayaran Anda')}
          digitStyle={{
            backgroundColor: 'rgba(66, 66, 66, 0)',
          }}
          digitTxtStyle={{color: COLORS.black}}
          separatorStyle={{color: COLORS.black}}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{m: null, s: null}}
          showSeparator
        />
        <Divider
          style={{
            backgroundColor: COLORS.black,
            height: 1,
            width: '100%',
            marginTop: 9,
          }}
        />
        <Text style={styles.labelTotal}>Total Payment</Text>
        <Text style={styles.valuePembayaran}>{convertToRupiah(sum)}</Text>
      </View>

      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <CardPayment type="Visa" />
        </ScrollView>
      </View>

      <ScrollView style={{marginTop: 40}}>{Item}</ScrollView>

      <Divider
        style={{
          backgroundColor: COLORS.black,
          height: 1,
          width: '100%',
          marginTop: 9,
        }}
      />

      <View>{Total()}</View>

      <TouchableOpacity
        style={styles.buttonBackToHome}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.valueBacktoHome}>Shopping Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinishPayment;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: 25,
    marginTop: 47,
  },
  dateTimeContainer: {
    flexDirection: 'row',
  },
  date: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body1,
  },
  dateTime: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body1,
    marginLeft: 10,
  },
  labelTotal: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
    marginTop: 15,
  },
  valuePembayaran: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
    marginBottom: 40,
  },
  buttonBackToHome: {
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.regular,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  valueBacktoHome: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body1,
    color: COLORS.white,
  },
});
