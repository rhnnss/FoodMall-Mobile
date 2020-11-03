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
import {useDispatch} from 'react-redux';
import {COLORS, FONTS, images, SIZES} from '../../constants';
import {StarActive, StarNonActive} from '../../constants/icons';
import {ADD_TO_CART} from '../../redux/CartItem';

const Products = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.100.12:4090/newProducts')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setDataSource(responseJson);
        setIsLoading(false);
      });
  }, []);

  let modul = dataSource.map((value, index) => {
    const Star = () => {
      if (value.star === '5')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
          </View>
        );
      if (value.star === '4')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
            <StarNonActive />
          </View>
        );
      if (value.star === '3')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (value.star === '2')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (value.star === '1')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (value.star === '0')
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

    const dispatch = useDispatch();
    const addItemToCart = (value) =>
      dispatch({type: ADD_TO_CART, payload: value});

    return (
      <View key={index}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('CardItemDetails', {
              value: value,
              id: value.id,
              title: value.nama,
              image: value.icon,
              price: value.harga,
              star: value.star,
              description: value.deskripsi,
              coma: convertToRupiah,
              addItemToCart: addItemToCart,
            })
          }>
          <ImageBackground
            source={{uri: value.background}}
            style={styles.backgroundProduct}>
            <Image source={{uri: value.icon}} style={styles.product} />
          </ImageBackground>

          <View style={styles.info}>
            <Text style={styles.labelTitle}>{value.nama}</Text>
            <Text style={styles.valuePrice}>
              {convertToRupiah(value.harga)}
            </Text>
          </View>
          <Star />
        </TouchableOpacity>
      </View>
    );
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" animating />
      </View>
    );
  } else {
    return <View style={styles.page}>{modul}</View>;
  }
};

export default Products;

const styles = StyleSheet.create({
  Icon: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: -20,
  },
  container: {
    flexDirection: 'column',
  },
  button: {
    width: 182,
    height: 278,
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
