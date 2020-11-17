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
import {BORDER_RADIUS} from '../constants/themes';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import Axios from 'axios';

const FinishPayment = ({cart}) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const navigation = useNavigation();

  const [DataSource, setDataSource] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;

    cart.forEach((item) => {
      price += item.qty * item.harga + 2500;
    });

    setTotalPrice(price);
  }, [cart, totalPrice, setTotalPrice]);

  let today = new Date();

  var weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

  var month = new Array();
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';
  let date =
    weekday[today.getDay()] +
    ', ' +
    today.getDate() +
    ' ' +
    month[today.getMonth()] +
    ' ' +
    today.getFullYear();

  function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }
  let time = today.getHours() + ':' + addZero(today.getMinutes());

  let nowDate = date;
  let nowTime = time;

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

  const Item = cart.map((val, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
        key={index}>
        <Text style={{fontFamily: FONTS.medium, fontSize: SIZES.body1}}>
          {val.nama}
        </Text>
        <Text style={{fontFamily: FONTS.regular, fontSize: SIZES.body1}}>
          {convertToRupiah(val.harga)}
        </Text>
      </View>
    );
  });

  let sum = DataSource.reduce((acc, crv) => {
    let all = acc + crv.price;
    return all;
  }, 2500);

  const Total = () => {
    // let sum = DataSource.reduce((acc, crv) => {
    //   let all = acc + crv.price;
    //   return all;
    // }, 2500);

    return (
      <View
        style={{
          justifyContent: 'space-between',
          marginBottom: 5,
          marginTop: 15,
        }}>
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
          {convertToRupiah(totalPrice)}
        </Text>
      </View>
    );
  };

  //--------------------------- Render Container ---------------------------
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Your Payment Deadline</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>{nowDate}</Text>
          <Text style={styles.dateTime}>{nowTime}</Text>
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
        <Text style={styles.valuePembayaran}>
          {convertToRupiah(totalPrice - 2500)}
        </Text>
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
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  cart: state.shop.cart,
});

export default connect(mapStateToProps)(FinishPayment);

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
    fontFamily: FONTS.bold,
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
    paddingVertical: 16,
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
    marginBottom: 20,
  },
  valueBacktoHome: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body1,
    color: COLORS.white,
  },
});
