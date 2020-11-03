import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {AddToCart, DetailCountButton} from '../components';
import {ArrowBack, Trash} from '../constants/icons';
import {COLORS} from '../constants';
import {BORDER_RADIUS, FONTS, SIZES} from '../constants/themes';
import {REMOVE_FROM_CART} from '../redux/CartItem';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

const ShopCart = ({route}) => {
  const arrIcon = 40;
  const trashIcon = 25;
  const navigation = useNavigation();

  const cartItems = useSelector((state) => state);

  let modul = cartItems.map((value, index) => {
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

    const dispatch = useDispatch();
    const removeItemFromCart = (value) =>
      dispatch({
        type: REMOVE_FROM_CART,
        payload: value,
      });

    return (
      <View style={styles.cardContainer} key={index}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: 'https://i.imgur.com/kRjQpZg.png'}}
            style={styles.image}
          />
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detailHeader}>
            <Text style={styles.labeldetail}>{value.nama}</Text>

            <TouchableOpacity
              style={styles.miniDeleteButton}
              onPress={() => removeItemFromCart(value)}>
              <Trash width={trashIcon} height={trashIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailFooter}>
            <DetailCountButton type="Mini" />
            <Text style={styles.valuePrice}>
              {convertToRupiah(value.harga)}
            </Text>
          </View>
        </View>
      </View>
    );
  });

  if (cartItems.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.goBack()}>
            <ArrowBack width={arrIcon} height={arrIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn}>
            <Text style={styles.labelDelete}>Hapus Semua</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>{modul}</ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: FONTS.medium, fontSize: SIZES.h1}}>
          No Items in Your Cart
        </Text>
      </View>
    );
  }
};

export default ShopCart;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 36,
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 36,
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
    width: 60,
    height: 60,
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
    width: 210,
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
    textAlign: 'left',
  },
  valuePrice: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.body3,
    textAlign: 'center',
    color: COLORS.black,
  },
});
