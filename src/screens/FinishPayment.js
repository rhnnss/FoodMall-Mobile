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
import {block} from 'react-native-reanimated';

const FinishPayment = ({cart}) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const navigation = useNavigation();

  const [DataSource, setDataSource] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState('PENDING');
  const [showModal, setShowModal] = useState(false);

  // Modal Paypal Showing
  const handleResponse = (data) => {
    if (data.title === 'success') {
      setShowModal(false);
      setStatus('COMPLETED');
    } else if (data.title === 'cancel') {
      setShowModal(false);
      setStatus('CANCELED');
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
        <Text
          style={{fontFamily: FONTS.medium, fontSize: SIZES.body1, width: 280}}>
          {val.nama}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.body1,
            color: COLORS.red,
          }}>
          {convertToRupiah(val.harga)}
        </Text>
      </View>
    );
  });

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
              color: COLORS.red,
            }}>
            10%
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: SIZES.body1,
            alignSelf: 'flex-end',
            color: COLORS.red,
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
          <Text style={styles.paymentDurationTitle}>PAYMENT DEADLINE</Text>
          <Text style={styles.importantText}>
            Don't forget to screenshot invoice in the Application, the total
            price is included in 10% VAT
          </Text>
          <View style={styles.timerContainer(status)}>
            <CountDown
              style={styles.CountDownContainer}
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
          </View>
          <View style={styles.TotalPaymentContainer}>
            <Text style={styles.TpTitle}>Total Pembayaran</Text>
            <Text style={styles.TpValue}>{convertToRupiah(totalPrice)}</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Image
            source={images.TicketBackground}
            style={styles.ImageBackground}
          />
          <View style={styles.listItem}>
            <ScrollView
              style={{marginTop: 40, height: 250, overflow: 'hidden'}}>
              {Item}
            </ScrollView>

            <View style={styles.paymentStatusContainer}>
              {/* <Text style={styles.paymentStatus}>PAYMENT STATUS :</Text> */}
              <Text style={styles.paymentStatusValue(status)}>{status}</Text>
            </View>

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
  },
  top: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  importantText: {
    textAlign: 'center',
    width: 290,
    fontFamily: FONTS.regular,
    fontSize: SIZES.default,
    color: COLORS.white,
    marginTop: 10,
  },
  paymentDurationTitle: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: SIZES.h11,
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
    overflow: 'hidden',
  },
  buttonCheckout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 32,
  },
  listItem: {
    paddingHorizontal: 22,
  },
  paymentStatusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentStatus: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body3,
    color: COLORS.black,
  },
  paymentStatusValue: (status) => ({
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.body3,
    color: status === 'COMPLETED' ? COLORS.Darkgreen : COLORS.Darkred,
    marginLeft: 10,
  }),
  CountDownContainer: {
    display: 'flex',
    marginTop: 10,
  },
  timerContainer: (status) => ({
    display: status === 'PENDING' ? 'flex' : 'none',
  }),
  TotalPaymentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  TpValue: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h11,
    color: COLORS.Darkred,
  },
  TpTitle: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
    color: COLORS.white,
  },
});
