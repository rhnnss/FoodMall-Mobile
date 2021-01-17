import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS, FONTS, images, SIZES} from '../constants';
import CountDown from 'react-native-countdown-component';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import {ArrowLeftBlack} from '../constants/icons';

const FinishPayment = ({cart}) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const navigation = useNavigation();

  const [DataSource, setDataSource] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState('Pending');
  const [showModal, setShowModal] = useState(false);

  // Modal Paypal Showing
  const handleResponse = (data) => {
    if (data.title === 'success') {
      setShowModal(false);
      setStatus('Completed');
    } else if (data.title === 'cancel') {
      setShowModal(false);
      setStatus('Canceled');
    } else {
      return;
    }
  };

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
    <ScrollView style={{backgroundColor: COLORS.primary}}>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <WebView
          source={{uri: 'http://localhost:4090/'}}
          onNavigationStateChange={(data) => handleResponse(data)}
          injectedJavaScript={`document.getElementById("price").value=${totalPrice};document.f1.submit()`}
        />
      </Modal>

      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.arrowLeft}
            onPress={() => navigation.navigate('Home')}>
            <ArrowLeftBlack width={40} height={40} />
          </TouchableOpacity>
          <Text style={styles.paymentDurationTitle}>
            Batas Akhir Pembayaranmu
          </Text>
          <CountDown
            style={{display: 'flex', marginTop: 10}}
            size={20}
            until={86400}
            onFinish={() => alert('Maaf Melebihi Batas Waktu')}
            onPress={() => alert('Segera Selesaikan Pembayaran Anda')}
            digitStyle={{
              backgroundColor: 'rgba(66, 66, 66, 0)',
            }}
            digitTxtStyle={{color: COLORS.white, fontSize: SIZES.h11}}
            separatorStyle={{color: COLORS.white}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{m: null, s: null}}
            showSeparator
          />
          <View style={styles.importantContainer}>
            <Text style={styles.importantText}>
              Pastikan screen shoot laman ini untuk mencocokkan harga
            </Text>
            <Text style={styles.importantTextRed}>
              * HATI - HATI BANYAK PENIPUAN *
            </Text>
          </View>
          <Text style={styles.paymentStatus}>Payment Status: {status}</Text>
        </View>

        <View style={styles.bottom}>
          <Image
            source={images.TicketBackground}
            style={styles.ImageBackground}
          />
          <View style={styles.listItem}>
            <ScrollView style={{marginTop: 40}}>
              {Item}
              <Divider
                style={{
                  backgroundColor: COLORS.black,
                  height: 1,
                  width: '100%',
                  marginTop: 9,
                }}
              />
              <View>{Total()}</View>
            </ScrollView>
            <TouchableOpacity
              style={styles.buttonCheckout}
              onPress={() => setShowModal(true)}>
              <Image source={images.PaypalCheckout} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  cart: state.shop.cart,
});

export default connect(mapStateToProps)(FinishPayment);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    borderWidth: 2,
    height: 749,
    paddingHorizontal: 0,
    // paddingVertical: 'auto',
    // borderColor: COLORS.green,
  },
  top: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
  },
  importantContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  importantText: {
    textAlign: 'center',
    width: 292,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body3,
    color: COLORS.white,
    lineHeight: 29,
  },
  importantTextRed: {
    textAlign: 'center',
    width: 292,
    fontFamily: FONTS.bold,
    fontSize: SIZES.body3,
    color: COLORS.Darkred,
  },
  paymentDurationTitle: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
    color: COLORS.white,
  },
  arrowLeft: {
    position: 'absolute',
    left: 25,
    top: -50,
  },
  ImageBackground: {
    position: 'absolute',
    zIndex: -1,
  },
  buttonCheckout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  listItem: {
    paddingHorizontal: 22,
  },
  paymentStatus: {
    marginTop: 25,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body3,
    color: COLORS.white,
  },
});
