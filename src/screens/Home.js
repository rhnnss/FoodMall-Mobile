import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Search, Category, SortModal, Products} from '../components';
import {images, FONTS, SIZES, COLORS} from '../constants';
import {ArrowDown} from '../constants/icons';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {fecthProducts} from '../redux/Shopping/Shopping-actions';

const Home = ({dispatch, products, loading, hasErrors}) => {
  let popupRef = React.createRef();

  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  useEffect(() => {
    dispatch(fecthProducts());
  }, [dispatch]);

  console.log(products);

  // Render Products
  const renderProducts = () => {
    if (loading) {
      return <Text>Loading Man...</Text>;
    }
    if (hasErrors) {
      return <Text>No Products to Display</Text>;
    }

    return products.map((product) => {
      if (product.role === 'Home') {
        return <Products key={product.id} data={product} />;
      }
    });
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.container}>
        {/*------------------------------- Header Container ------------------------------------- */}
        <View style={styles.headerContainer}>
          <View style={styles.HeaderText}>
            <Text style={styles.LabelHeader}>Hey, Albert Flores</Text>
            <Text style={styles.ValueHeader}>Let’s find quality food</Text>
          </View>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['rgba(255, 253, 210, 0)', COLORS.primary]}
            style={styles.linearGradient}></LinearGradient>

          <TouchableOpacity style={styles.avatar} onPress={() => test()}>
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

        {/*------------------------------- Our Product ------------------------------------- */}
        <View style={styles.ourProduct}>
          <Text style={styles.LabelHeader2}>Our Product</Text>
          <TouchableOpacity
            style={styles.containerSortBy}
            onPress={onShowPopup}>
            <Text style={styles.LabelHeader2}>Sort By</Text>
            <ArrowDown />
          </TouchableOpacity>
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

export default connect(mapStateToProps)(Home);

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
    top: -100,
    left: 210,
    transform: [{rotate: '-65deg'}],
  },
  RandomProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    flexWrap: 'wrap',
  },
  Search: {
    paddingHorizontal: 22,
  },
});
