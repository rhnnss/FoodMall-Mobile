import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {AddToCart, DetailCountButton} from '../components';
import {COLORS} from '../constants';
import {ArrowBack, Trash} from '../constants/icons';
import {BORDER_RADIUS, FONTS, SIZES} from '../constants/themes';

const ShopCart = ({route}) => {
  const arrIcon = 40;
  const trashIcon = 25;
  const navigation = useNavigation();
  const {title, image} = route.params;

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

      {/* Card */}
      <ScrollView>
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: image}} style={styles.image} />
          </View>

          <View style={styles.detailContainer}>
            <View style={styles.detailHeader}>
              <Text style={styles.labeldetail}>{title}</Text>

              <TouchableOpacity style={styles.miniDeleteButton}>
                <Trash width={trashIcon} height={trashIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.detailFooter}>
              <DetailCountButton type="Mini" />
              <Text style={styles.valuePrice}>Rp. 25.000</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
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
    marginTop: 38,
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.greyLight2,
    paddingHorizontal: 13,
    paddingVertical: 16,
    borderRadius: BORDER_RADIUS.default,
    alignItems: 'center',
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
