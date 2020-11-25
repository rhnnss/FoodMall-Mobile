import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import {Package, ArrowBack} from '../../constants/icons';
import {BORDER_RADIUS, FONTS, SIZES} from '../../constants/themes';

const Button = ({
  type,
  navigate,
  title,
  desc,
  role,
  size,
  func,
  deleteFunc,
  titleDelete,
  logoutFunc,
}) => {
  const navigation = useNavigation();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch('http://192.168.100.12:4090/dataPesanan')
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Sizing
  let PackageWidth = 34;
  let PackageHeight = 34;

  let ArrowWidth = size === 'large' ? 92 : 30;
  let ArrowHeight = size === 'large' ? 92 : 30;

  const Icon = () => {
    if (type === 'Package') {
      return <Package width={PackageWidth} height={PackageHeight} />;
    }
  };

  let NewOrderItem = dataSource.map((val, id) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigate === 'DetailPesanan'
            ? navigation.navigate('DetailPesanan')
            : alert('Nope')
        }
        key={id}>
        <Icon />
        <View style={styles.textContainer}>
          <Text style={styles.labelButton}>{val.name}</Text>
          <Text style={styles.valueButton}>{val.adress}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.labelValueButtonPengiriman}>Pengiriman</Text>
            <Text style={styles.valueButtonPengiriman}>{val.delivery}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  if (role === 'YellowButton') {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigate === 'Produk'
            ? navigation.navigate('Produk')
            : navigation.navigate('DataPesanan')
        }>
        <Icon />
        <View style={styles.textContainer}>
          <Text style={styles.labelButton}>{title}</Text>
          <Text style={styles.valueButton}>{desc}</Text>
        </View>
      </TouchableOpacity>
    );
  } else if (role === 'ArrowBack') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate === 'Home'
            ? navigation.navigate('DashboardOrderAdmin')
            : navigate === 'AllProduk'
            ? navigation.navigate('AllProduk')
            : navigation.navigate('DataPesanan')
        }
        style={styles.arrowBack(size)}>
        <ArrowBack width={ArrowWidth} height={ArrowHeight} />
      </TouchableOpacity>
    );
  } else if (role === 'NewOrder') {
    return <View>{NewOrderItem}</View>;
  } else if (role === 'ViewData') {
    return (
      <TouchableOpacity
        style={styles.buttonViewProduk}
        onPress={() =>
          navigate === 'ViewData'
            ? navigation.navigate('AllProduk')
            : alert('Nope')
        }>
        <Text style={styles.labelButtonViewData}>View Produk</Text>
      </TouchableOpacity>
    );
  } else if (role === 'Save') {
    return (
      <TouchableOpacity style={styles.buttonViewProduk} onPress={() => func()}>
        <Text style={styles.labelButtonViewData}>Save Data</Text>
      </TouchableOpacity>
    );
  } else if (role === 'Delete') {
    return (
      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => deleteFunc()}>
        <Text style={styles.labelButtonDelete}>{titleDelete}</Text>
      </TouchableOpacity>
    );
  } else if (role === 'Logout') {
    return (
      <TouchableOpacity style={styles.buttonViewProduk} onPress={logoutFunc}>
        <Text style={styles.labelButtonViewData}>Logout</Text>
      </TouchableOpacity>
    );
  }
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: 325,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: BORDER_RADIUS.regular,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonViewProduk: {
    width: 325,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: BORDER_RADIUS.regular,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDelete: {
    width: 121,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 37,
    borderRadius: BORDER_RADIUS.regular,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 15,
  },
  labelButton: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h3,
    color: COLORS.white,
  },
  valueButton: {
    width: 240,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body2,
    color: COLORS.white,
  },
  valueButtonPengiriman: {
    width: 262,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body2,
    color: COLORS.white,
    marginLeft: 7,
  },
  arrowBack: (size) => ({
    width: size === 'large' ? 128 : 42,
    height: size === 'large' ? 128 : 42,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:
      size === 'large' ? BORDER_RADIUS.medium : BORDER_RADIUS.regular,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }),
  labelValueButtonPengiriman: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.body2,
    color: COLORS.white,
  },
  labelButtonViewData: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.h3,
    color: COLORS.white,
  },
  labelButtonDelete: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.h3,
    color: COLORS.white,
  },
});
