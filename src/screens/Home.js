import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Search, Category, SortModal, Products} from '../components';
import {images, FONTS, SIZES, COLORS} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {fecthProducts} from '../redux/Shopping/Shopping-actions';
import {getUsername} from '../redux/Username/Username-action';

const Home = ({
  route,
  dispatch,
  products,
  loading,
  hasErrors,
  navigation,
  handleFetchProduct,
  handleGetUsername,
}) => {
  const {username} = route.params;
  const [dataSortByName, setDataSortByName] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [lower, setLower] = useState(
    products.sort((a, b) => (+a.harga > +b.harga ? 1 : -1)),
  );
  const [higher, setHigher] = useState(
    products.sort((a, b) => (+a.harga < +b.harga ? 1 : -1)),
  );
  const [abjad, setAbjad] = useState(
    products.sort((a, b) =>
      a.harga.toLowerCase() > b.harga.toLowerCase() ? 1 : -1,
    ),
  );

  useEffect(() => {
    // dispatch(fecthProducts());
    handleGetUsername(username);
    handleFetchProduct();
    setMasterDataSource(products);
    setDataSortByName(products);
  }, [handleGetUsername, handleFetchProduct]);

  // ------------------------------- Sorting -------------------------------

  const sortingA = () => {
    let sortByName = masterDataSource.sort(compare);

    // Sorting
    function compare(a, b) {
      const namaA = a.nama.toUpperCase();
      const namaB = b.nama.toUpperCase();

      let comparison = 0;
      if (namaA > namaB) {
        comparison = 1;
      } else if (namaA < namaB) {
        comparison = -1;
      }
      return comparison;
    }

    return setDataSortByName(sortByName);
  };

  const sortingPriceHigher = () => {
    let sortByHigher = masterDataSource.sort(compareHigher);

    function compareHigher(a, b) {
      const hargaA = +a.harga;
      const hargaB = +b.harga;

      let comparison = 0;
      if (hargaA < hargaB) {
        comparison = 1;
      } else if (hargaA > hargaB) {
        comparison = -1;
      }
      return comparison;
    }

    return setDataSortByName(sortByHigher);
  };

  const sortingPriceLower = () => {
    let sortByLower = masterDataSource.sort(compareLower);

    // Sorting
    function compareLower(a, b) {
      const hargaA = a.harga;
      const hargaB = b.harga;

      let comparison = 0;
      if (hargaA > hargaB) {
        comparison = 1;
      } else if (hargaA < hargaB) {
        comparison = -1;
      }
      return comparison;
    }

    return setDataSortByName(sortByLower);
  };

  let popupRef = React.createRef();

  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  //------------------------------- Render Products -------------------------------
  const renderProducts = () => {
    if (loading) {
      return <Text>Loading Man...</Text>;
    }
    if (hasErrors) {
      return <Text>No Products to Display</Text>;
    }

    return products
      .sort((a, b) => (+a.harga > +b.harga ? 1 : -1))
      .map((product) => {
        if (product.role === 'Home') {
          return <Products key={product.id} data={product} />;
        }
      });

    // return (
    //   <FlatList
    //     data={masterDataSource}
    //     keyExtractor={(item, index) => index.toString()}
    //     renderItem={({item}) =>
    //       item.role === 'Fish' ? <Products data={item} /> : null
    //     }
    //     contentContainerStyle={{
    //       lexDirection: 'row',
    //       justifyContent: 'space-between',
    //       paddingHorizontal: 12,
    //       marginTop: -35,
    //     }}
    //   />
    // );
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.container}>
        {/*------------------------------- Header Container ------------------------------------- */}
        <View style={styles.headerContainer}>
          <View style={styles.HeaderText}>
            <Text style={styles.LabelHeader}>{username}</Text>
            <Text style={styles.ValueHeader}>Let’s find quality food</Text>
          </View>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['rgba(255, 253, 210, 0)', COLORS.primary]}
            style={styles.linearGradient}></LinearGradient>

          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate('Account')}>
            <Image source={images.avatar}></Image>
            <View style={styles.miniCircle} />
          </TouchableOpacity>
        </View>

        {/*------------------------------- Search ------------------------------------- */}

        <View style={styles.Search}>
          <Search />
        </View>

        {/*------------------------------- Category ------------------------------------- */}
        <View style={styles.Category}>
          <Text style={styles.LabelHeader2}>Category</Text>
          <View style={styles.categoryList}>
            <Category title="Breakfast" />
            <Category title="Beef" />
            <Category title="Chicken Meat" />
            <Category title="Fish Meat" />
            <Category title="Ice Cream" />
            <Category title="Snack" />
          </View>
        </View>

        {/* <TouchableOpacity onPress={() => renderProductsWithSort()}>
          <Text>Press To Short</Text>
        </TouchableOpacity> */}

        {/*------------------------------- Our Product ------------------------------------- */}
        <View style={styles.ourProduct}>
          <Text style={styles.LabelHeader2}>Our Product</Text>
          {/* <TouchableOpacity
            style={styles.containerSortBy}
            onPress={onShowPopup}>
            <Text style={styles.LabelHeader2}>Sort By</Text>
            <ArrowDown />
          </TouchableOpacity> */}
        </View>

        {/*------------------------------- RandomProduct ------------------------------------- */}
        <View style={styles.RandomProduct}>{renderProducts()}</View>

        {/*------------------------------- Sort Modal ------------------------------------- */}
        <SortModal
          ref={(target) => (popupRef = target)}
          onTouchOutside={onClosePopup}
          title="You Wanna Sortby"
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  products: state.shop.products,
  loading: state.shop.loading,
  hasErrors: state.shop.hasErrors,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetUsername: (username) => dispatch(getUsername(username)),
  handleFetchProduct: () => dispatch(fecthProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
  },
  container: {
    paddingVertical: 36,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  LabelHeader: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
  },
  ValueHeader: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.h3,
    color: COLORS.grey,
  },
  miniCircle: {
    backgroundColor: COLORS.primary,
    width: 12,
    height: 12,
    borderRadius: 50,
    position: 'absolute',
    top: 44,
    left: 15,
  },
  ourProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 22,
  },
  Category: {
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 22,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  containerSortBy: {
    flexDirection: 'row',
  },
  LabelHeader2: {
    marginBottom: 20,
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
  },
  category: {
    flexDirection: 'row',
  },
  linearGradient: {
    width: 236,
    height: 236,
    borderRadius: 1000,
    position: 'absolute',
    top: -80,
    right: -50,
    transform: [{rotate: '-65deg'}],
  },
  RandomProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    flexWrap: 'wrap',
    marginTop: -35,
  },
  Search: {
    paddingHorizontal: 22,
  },
});
