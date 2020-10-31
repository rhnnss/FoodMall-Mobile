import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Search, Category, SortModal, RandomProducts} from '../components';
import {images, FONTS, SIZES, COLORS} from '../constants';
import {ArrowDown} from '../constants/icons';
import LinearGradient from 'react-native-linear-gradient';
import Products from '../components/Products';

const Home = () => {
  let popupRef = React.createRef();

  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  const popupList = [
    {
      id: 1,
      name: 'Sortby Name',
    },
    {
      id: 2,
      name: 'Sortby Higher Price',
    },
    {
      id: 3,
      name: 'Sortby Lower Price',
    },
  ];

  return (
    <ScrollView style={styles.page}>
      <View style={styles.container}>
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

          <TouchableOpacity style={styles.avatar}>
            <Image source={images.avatar}></Image>
            <View style={styles.miniCircle} />
          </TouchableOpacity>
        </View>

        <Search />

        <View style={styles.Category}>
          <Text style={styles.LabelHeader2}>Category</Text>
          <View style={styles.categoryList}>
            <Category title="Sarapan Pagi" />
            <Category title="Daging Sapi" />
            <Category title="Ayam" />
            <Category title="Ikan" />
            <Category title="Minuman" />
            <Category title="Camilan" />
          </View>
        </View>

        <View style={styles.ourProduct}>
          <Text style={styles.LabelHeader2}>Our Product</Text>
          <TouchableOpacity
            style={styles.containerSortBy}
            onPress={onShowPopup}>
            <Text style={styles.LabelHeader2}>Sort By</Text>
            <ArrowDown />
          </TouchableOpacity>
        </View>

        <View style={styles.RandomProduct}>
          <Products />
        </View>

        <SortModal
          ref={(target) => (popupRef = target)}
          onTouchOutside={onClosePopup}
          title="You Wanna Sortby"
          data={popupList}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
  },
  container: {
    marginHorizontal: 22,
    // paddingHorizontal: 22,
    // marginVertical: 36,
    paddingVertical: 36,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  RandomProduct: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // marginTop: -20,
  },
  Category: {
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
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
});
