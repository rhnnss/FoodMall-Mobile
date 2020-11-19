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
  TextInput,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES} from '../constants';
import {StarActive, StarNonActive, SearchIcon} from '../constants/icons';

const SearchInHome = () => {
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [filteredDataSourced, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState('');
  
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.100.12:4090/newProducts')
      .then((response) => response.json())
      .then((responseJson) => {
        setMasterDataSource(responseJson.results);
        setFilteredDataSource(responseJson.results);
        setLoading(false);
      });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.nama ? item.nama.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  let renderProducts = filteredDataSourced.map((item) => {
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

    // if (item.role === 'Beef') {
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
    // }
  });

  return (
    <View style={{height: '100%'}}>
      <LinearGradient
        tart={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['rgba(255, 214, 62, 100)', COLORS.primary]}
        style={styles.HeaderContainer}>
        <Text style={styles.headerLabel}>Let’s Search Your Product</Text>
        {/* --------------------------------- Search ---------------------------------------- */}
        <View style={styles.searchContainer}>
          <SearchIcon width={20} height={20} style={styles.search} />
          <TextInput
            style={styles.input}
            placeholder="Type your menu"
            onChangeText={(val) => searchFilterFunction(val)}
            value={search}
          />
        </View>
      </LinearGradient>
      {/* Products */}
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
          {/* <View style={styles.productsContainer}>
            <View style={styles.Products}>{renderProducts}</View>
          </View> */}
          <FlatList  />
        )}
      </ScrollView>
    </View>
  );
};

export default SearchInHome;

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
    paddingHorizontal: 12,
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
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
    marginTop: 28,
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body1,
    width: 325,
    paddingRight: 20,
    paddingLeft: 30,
  },
  search: {
    left: 20,
  },
});
