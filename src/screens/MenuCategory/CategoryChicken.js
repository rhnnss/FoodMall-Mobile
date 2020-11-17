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
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Search} from '../../components';
import {COLORS, FONTS, SIZES} from '../../constants';
import {StarActive, StarNonActive} from '../../constants/icons';

const CategoryChicken = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.100.12:4090/newProducts')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setDataSource(responseJson);
        setLoading(false);
      });
  }, []);

  let renderProducts = dataSource.map((item) => {
    const Star = () => {
      if (item.star === '5')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
          </View>
        );
      if (item.star === '4')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
            <StarNonActive />
          </View>
        );
      if (item.star === '3')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (item.star === '2')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (item.star === '1')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (item.star === '0')
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

    if (item.role === 'Chicken') {
      return (
        <TouchableOpacity
          style={styles.button}
          key={item.id}
          onPress={() =>
            navigation.navigate('CardItemDetails', {
              value: item,
              id: item.id,
              title: item.nama,
              image: item.icon,
              price: item.harga,
              star: item.star,
              description: item.deskripsi,
              coma: convertToRupiah,
            })
          }>
          <ImageBackground
            source={{uri: item.background}}
            style={styles.backgroundProduct}>
            <Image source={{uri: item.icon}} style={styles.product} />
          </ImageBackground>

          <View style={styles.info}>
            <Text style={styles.labelTitle}>{item.nama}</Text>
            <Text style={styles.valuePrice}>{convertToRupiah(item.harga)}</Text>
          </View>
          <Star />
        </TouchableOpacity>
      );
    }
  });

  return (
    <View style={{height: '100%'}}>
      <LinearGradient
        tart={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['rgba(255, 214, 62, 100)', COLORS.primary]}
        style={styles.HeaderContainer}>
        <Text style={styles.headerLabel}>Chicken Meat</Text>
        <View style={styles.search}>
          <Search />
        </View>
      </LinearGradient>
      <ScrollView style={{marginTop: 15}}>
        {loading == true ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '50%',
            }}>
            <ActivityIndicator size={50} color={COLORS.primary} />
          </View>
        ) : (
          <View style={styles.productsContainer}>
            <View style={styles.Products}>{renderProducts}</View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryChicken;

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
    marginTop: 15,
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
  Products: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    flexWrap: 'wrap',
  },
  HeaderContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: 40,
    alignItems: 'center',
  },
  headerLabel: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
    color: COLORS.white,
  },
  productsContainer: {
    marginBottom: 30,
  },
});
