import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, SIZES, BORDER_RADIUS} from '../../constants';
import {StarActive, StarNonActive} from '../../constants/icons';

const AllProduk = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getDataBase();
  }, []);

  const getDataBase = () => {
    fetch('http://192.168.100.12:4090/OrderAdmin', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
      });
  };

  //--------------------- Looping with const getData -----------------------

  const getData = dataSource.map((value) => {
    const Star = () => {
      switch (value.star) {
        case '0':
          return (
            <View style={styles.rating}>
              <Text>Maaf Belum di Nilai!</Text>
            </View>
          );
        case '1':
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarNonActive />
              <StarNonActive />
              <StarNonActive />
              <StarNonActive />
            </View>
          );
        case '2':
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarActive />
              <StarNonActive />
              <StarNonActive />
              <StarNonActive />
            </View>
          );
        case '3':
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarActive />
              <StarActive />
              <StarNonActive />
              <StarNonActive />
            </View>
          );
        case '4':
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarActive />
              <StarActive />
              <StarActive />
              <StarNonActive />
            </View>
          );
        case '5':
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarActive />
              <StarActive />
              <StarActive />
              <StarActive />
            </View>
          );
      }
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
      <TouchableOpacity style={styles.button} key={value.id}>
        <ImageBackground
          source={{uri: value.background}}
          style={styles.backgroundProduct}>
          <Image source={{uri: value.icon}} style={styles.product} />
        </ImageBackground>

        <View style={styles.info}>
          <Text style={styles.labelTitle}>{value.nama}</Text>
          <Text style={styles.valuePrice}>{convertToRupiah(value.harga)}</Text>
        </View>
        <Star />

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() =>
            navigation.navigate('UpdateProduct', {
              paramValue: value,
              autoReload: getDataBase,
            })
          }>
          <Text style={styles.labelButtonDelete}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => deleteButton(value)}>
          <Text style={styles.labelButtonDelete}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  });

  //----------------------------- Delete Button -----------------------------
  const deleteButton = (value) => {
    console.log(value);
    fetch('http://192.168.100.12:4090/OrderAdmin/' + value.id, {
      method: 'DELETE',
    })
      .then((response) => {
        getDataBase();
        alert('Succesful Delete Data' + value.nama);
        console.log(response.rows);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.basecontainer}>
      <Text style={styles.title}>All Product</Text>
      <View style={styles.page}>{getData}</View>
    </ScrollView>
  );
};

export default AllProduk;

const styles = StyleSheet.create({
  title: {
    marginTop: 36,
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
    marginBottom: 16,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  basecontainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  Icon: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  page: {
    marginHorizontal: 18,
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
    position: 'relative',
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
  labelButtonDelete: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.h3,
    color: COLORS.white,
  },
});
