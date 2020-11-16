import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS, images, SIZES} from '../../constants';
import {StarActive, StarNonActive} from '../../constants/icons';

const Products = ({data}) => {
  const navigation = useNavigation();

  const Star = () => {
    if (data.star === '5')
      return (
        <View style={styles.rating}>
          <StarActive />
          <StarActive />
          <StarActive />
          <StarActive />
          <StarActive />
        </View>
      );
    if (data.star === '4')
      return (
        <View style={styles.rating}>
          <StarActive />
          <StarActive />
          <StarActive />
          <StarActive />
          <StarNonActive />
        </View>
      );
    if (data.star === '3')
      return (
        <View style={styles.rating}>
          <StarActive />
          <StarActive />
          <StarActive />
          <StarNonActive />
          <StarNonActive />
        </View>
      );
    if (data.star === '2')
      return (
        <View style={styles.rating}>
          <StarActive />
          <StarActive />
          <StarNonActive />
          <StarNonActive />
          <StarNonActive />
        </View>
      );
    if (data.star === '1')
      return (
        <View style={styles.rating}>
          <StarActive />
          <StarNonActive />
          <StarNonActive />
          <StarNonActive />
          <StarNonActive />
        </View>
      );
    if (data.star === '0')
      return (
        <View style={styles.rating}>
          <Text>Maaf Belum di Nilai!</Text>
        </View>
      );
  };

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
    <TouchableOpacity
      style={styles.button}
      key={data.id}
      onPress={() =>
        navigation.navigate('CardItemDetails', {
          value: data,
          id: data.id,
          title: data.nama,
          image: data.icon,
          price: data.harga,
          star: data.star,
          description: data.deskripsi,
          coma: convertToRupiah,
        })
      }>
      <ImageBackground
        source={{uri: data.background}}
        style={styles.backgroundProduct}>
        <Image source={{uri: data.icon}} style={styles.product} />
      </ImageBackground>

      <View style={styles.info}>
        <Text style={styles.labelTitle}>{data.nama}</Text>
        <Text style={styles.valuePrice}>{convertToRupiah(data.harga)}</Text>
      </View>
      <Star />
    </TouchableOpacity>
  );
};

export default Products;

const styles = StyleSheet.create({
  Icon: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  button: {
    width: 182,
    paddingVertical: 40,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  rating: {
    flexDirection: 'row',
    paddingTop: 14,
    justifyContent: 'flex-end',
  },
  info: {
    alignItems: 'center',
    width: 129.25,
    marginTop: 7,
  },
  labelTitle: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: SIZES.h2,
  },
  valuePrice: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
    marginTop: 7,
  },
  product: {
    width: 73,
    height: 57.16,
  },
  backgroundProduct: {
    width: 98.17,
    height: 98.17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
