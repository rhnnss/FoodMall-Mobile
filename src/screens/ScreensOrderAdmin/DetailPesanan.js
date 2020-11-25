import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {FONTS, SIZES, COLORS, BORDER_RADIUS} from '../../constants';
import {ButtonForOrderAdmin} from '../../components';
// import {ArrowBack, ArrowDown, CarShipping, Trash} from '../../constants/icons';
// import DetailCountButton from '../components/DetailCountButton';
import {useNavigation} from '@react-navigation/native';

const DetailPesanan = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.100.12:4090/dataPesanan')
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
      });
  }, []);

  let modul = dataSource.map((value, index) => {
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

    return (
      <View style={styles.cardContainer} key={index}>
        <View style={styles.imageContainer}>
          <Image source={{uri: value.icon}} style={styles.image} />
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detailHeader}>
            <Text style={styles.labeldetail}>{value.nama_menu}</Text>
          </View>

          <View style={styles.detailFooter}>
            <View style={styles.quantityyContainer}>
              <Text style={styles.labelQuantity}>Jumlah :</Text>
              <Text style={styles.valueQuantiy}>{value.jumlah_pesanan}</Text>
            </View>
            <Text style={styles.valuePrice}>
              {convertToRupiah(value.harga_menu)}
            </Text>
          </View>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.baseContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ButtonForOrderAdmin
            type="Package"
            role="ArrowBack"
            navigate="DataPesanan"
          />
          <Text style={styles.title}>Detail Pesanan</Text>
        </View>

        <ScrollView style={{height: 500}}>
          <View>{modul}</View>
          <View>{modul}</View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerBottom}>
          <View style={styles.footerPriceContainer}>
            <Text style={styles.labelFooterPrice}>Total Harga</Text>
            <Text style={styles.valueFooterPrice}>Rp. 1.500.000</Text>
          </View>

          <TouchableOpacity
            style={styles.pembayaranBtn}
            onPress={() => navigation.navigate('FinishSendToKurir')}>
            <Text style={styles.labelPembayaran}>Pengiriman</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailPesanan;

const deviceWidht = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  baseContainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  container: {
    paddingHorizontal: 22,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 38,
    marginBottom: 33,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h2,
    marginLeft: 79,
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.greyLight2,
    paddingHorizontal: 13,
    paddingVertical: 16,
    borderRadius: BORDER_RADIUS.default,
    alignItems: 'center',
    marginBottom: 15,
  },
  detailContainer: {
    justifyContent: 'space-between',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labeldetail: {
    width: deviceWidht * 0.5,
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
    textAlign: 'left',
  },
  quantityyContainer: {
    flexDirection: 'row',
  },
  labelQuantity: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body3,
    textAlign: 'center',
    color: COLORS.black,
  },
  valueQuantiy: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
    textAlign: 'center',
    color: COLORS.black,
    marginLeft: 4,
  },
  valuePrice: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
    textAlign: 'center',
    color: COLORS.black,
  },
  headerBtn: {
    backgroundColor: COLORS.white,
    width: 52,
    height: 52,
    borderRadius: BORDER_RADIUS.regular,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  miniDeleteButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 11,
    paddingVertical: 11,
    width: 30,
    height: 30,
    borderRadius: BORDER_RADIUS.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: BORDER_RADIUS.regular,
  },
  labelDelete: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h3,
    textAlign: 'center',
    color: COLORS.white,
  },
  image: {
    width: deviceWidht * 0.14,
    height: deviceHeight * 0.08,
  },

  footer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: deviceHeight * 0.2,
    paddingHorizontal: 22,
    paddingTop: 36,
    shadowColor: '#000',
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 40,
  },
  triggerModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 217,
  },
  labelModal: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
  },
  footerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerPriceContainer: {
    marginTop: 20,
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
