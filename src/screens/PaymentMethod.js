import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import {OvoPayment, Package, Pencil} from '../constants/icons';
import {BORDER_RADIUS} from '../constants/themes';
import ToggleSwitch from 'toggle-switch-react-native';
import {AdressDeliveryModal, PaymentVia} from '../components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

const PaymentMethod = ({cart}) => {
  const navigation = useNavigation();
  const deviceHeight = Dimensions.get('window').height;
  // const [isEnable, setIsEnable] = useState(false);
  // const toggleSwitch = () => setIsEnable((previousState) => !previousState);
  const [isOnBlueToggleSwitch, setIsOnBlueToggleSwitch] = useState(false);

  const [propsName, setPropsName] = useState('Albert Flores');
  const [propsAddress, setPropsAddress] = useState(
    '6391 Elgin St. Celina, Delaware 10299',
  );

  // ------------------------------------ Calculate Total Price ------------------------------------
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;

    cart.forEach((item) => {
      price += item.qty * item.harga;
    });

    setTotalPrice(price);
  }, [cart, totalPrice, setTotalPrice]);

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

  // ------------------------------------ Modal Ref ------------------------------------
  let popupRef = React.createRef();
  const onShowPopup = () => {
    popupRef.show();
  };
  const onClosePopup = () => {
    popupRef.close();
  };

  const getName = (val) => {
    setPropsName(val);
  };

  const getAddress = (val) => {
    setPropsAddress(val);
  };

  return (
    <View style={styles.container}>
      {/*----------------- Modal -----------------*/}
      <AdressDeliveryModal
        ref={(target) => (popupRef = target)}
        onTouchOutside={onClosePopup}
        title="Alamat Pengiriman"
        getName={getName}
        getAddress={getAddress}
      />

      {/*----------------- Address -----------------*/}
      <View style={styles.adressContainer}>
        <Text style={styles.title}>Delivery Adress</Text>
        <View style={styles.addresCardContainer}>
          <View style={styles.packageIcon}>
            <Package width={24} height={24} />
          </View>
          <View style={styles.addresTextContainer}>
            <Text style={styles.labelName}>{propsName}</Text>
            <Text style={styles.valueAddres}>{propsAddress}</Text>
          </View>
          <TouchableOpacity style={styles.pencilIcon} onPress={onShowPopup}>
            <Pencil width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/*----------------- Ovo Payment -----------------*/}
      <View>
        <View style={styles.OvoPaymentHeader}>
          <Text style={styles.title}>Using OVO Payment</Text>
          <OvoPayment style={styles.OvoPaymentIcon} width={24} height={24} />
        </View>

        <View style={styles.OvoPaymentDetail}>
          <View style={styles.saldoContainer}>
            <Text style={styles.valueCash}>OVO Cash Rp 1.500.000</Text>
            <Text style={styles.valuePoint}>OVO Points Rp 1.500</Text>
          </View>
          <ToggleSwitch
            onColor={COLORS.primary}
            offColor={COLORS.red}
            size="medium"
            isOn={isOnBlueToggleSwitch}
            onToggle={(isOnBlueToggleSwitch) =>
              setIsOnBlueToggleSwitch(isOnBlueToggleSwitch)
            }
          />
        </View>
      </View>

      {/*----------------- Payment Method -----------------*/}
      <View>
        <Text style={styles.title}>Payment Method</Text>
        <ScrollView style={{height: deviceHeight * 0.35}}>
          <PaymentVia via="Bank" status={true} />
          <PaymentVia via="Ceriamart" status={false} />
          <PaymentVia via="Cash" status={false} />
        </ScrollView>
      </View>

      {/*----------------- Total -----------------*/}
      <View style={styles.footer}>
        <View style={styles.footerBottom}>
          <View style={styles.footerPriceContainer}>
            <Text style={styles.labelFooterPrice}>Total Price</Text>
            <Text style={styles.valueFooterPrice}>
              {convertToRupiah(totalPrice)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.pembayaranBtn}
            onPress={() => navigation.navigate('FinishPayment')}>
            <Text style={styles.labelPembayaran}>Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  cart: state.shop.cart,
});

export default connect(mapStateToProps)(PaymentMethod);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    backgroundColor: COLORS.white,
    height: '100%',
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
    marginTop: 35,
  },
  addresCardContainer: {
    marginTop: 29,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  packageIcon: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.small,
  },
  labelName: {
    width: 228,
    fontFamily: FONTS.medium,
    fontSize: 18,
  },
  valueAddres: {
    width: 228,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body1,
  },
  OvoPaymentHeader: {
    flexDirection: 'row',
  },
  OvoPaymentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  OvoPaymentIcon: {
    marginTop: 35,
    marginLeft: 13,
  },
  saldoContainer: {
    marginTop: 10,
  },
  valueCash: {
    width: 228,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body1,
  },
  valuePoint: {
    marginTop: 5,
    width: 228,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body1,
  },
  footer: {
    marginTop: 20,
  },
  footerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelFooterPrice: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
  },
  valueFooterPrice: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body3,
  },
  pembayaranBtn: {
    paddingHorizontal: 34,
    paddingVertical: 15,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.verySmall,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  labelPembayaran: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body2,
    color: COLORS.white,
  },
});
