import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {AddToCart, DetailCountButton} from '../components';
import {COLORS, FONTS, SIZES} from '../constants';
import {
  ArrowBack,
  Share,
  StarActive,
  StarNonActive,
  Plus,
  Minus,
} from '../constants/icons';
import {BORDER_RADIUS} from '../constants/themes';

const CardItemDetails = ({route, navigation}) => {
  // const navigation = useNavigation();
  const {
    value,
    title,
    image,
    price,
    star,
    description,
    coma,
    addItemToCart,
  } = route.params;
  const arrIcon = 40;
  const shareIcon = 30;
  const starIcon = 20;

  const WhatsAppLink =
    'https://wa.me/+62-(896) - 20044936?text=I want to order' + {title};

  const handleWhatsappPress = async () => {
    await Linking.openURL(WhatsAppLink);
  };

  const Stars = () => {
    if (star === '5')
      return (
        <View style={styles.rating}>
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
        </View>
      );
    if (star === '4')
      return (
        <View style={styles.rating}>
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
        </View>
      );
    if (star === '3')
      return (
        <View style={styles.rating}>
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
        </View>
      );
    if (star === '2')
      return (
        <View style={styles.rating}>
          <StarActive width={starIcon} height={starIcon} />
          <StarActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
        </View>
      );
    if (star === '1')
      return (
        <View style={styles.rating}>
          <StarActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
          <StarNonActive width={starIcon} height={starIcon} />
        </View>
      );
    if (star === '0')
      return (
        <View style={styles.rating}>
          <Text>Maaf Belum di Nilai!</Text>
        </View>
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.goBack()}>
            <ArrowBack width={arrIcon} height={arrIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerBtn}
            onPress={handleWhatsappPress}>
            <Share width={shareIcon} height={shareIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            style={{
              width: 286.03,
              height: 200,
            }}
          />
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.label}>{title}</Text>
        <Text style={styles.price}>{coma(price)}</Text>
        <View style={styles.starContainer}>
          <Stars />
          <Text style={styles.valueRating}>{star}.0</Text>
        </View>
        <Text style={styles.value}>{description}</Text>

        <View style={styles.footer}>
          {/* <DetailCountButton type="Large" /> */}

          <AddToCart addItemToCart={addItemToCart} value={value} />
        </View>
      </View>
    </View>
  );
};

export default CardItemDetails;

const headerButtonSize = 52;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
  },
  headerContainer: {
    paddingHorizontal: 22,
    paddingVertical: 36,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerBtn: {
    backgroundColor: COLORS.white,
    width: headerButtonSize,
    height: headerButtonSize,
    borderRadius: 14,
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    paddingHorizontal: 22,
    paddingVertical: 36,
    borderTopRightRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
    backgroundColor: COLORS.white,
    height: '100%',
  },
  label: {
    marginTop: 20,
    fontSize: SIZES.h1,
    fontFamily: FONTS.regular,
  },
  price: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.medium,
    marginTop: 10,
  },
  value: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.regular,
    marginTop: 20,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rating: {
    flexDirection: 'row',
  },
  valueRating: {
    marginLeft: 7,
    fontFamily: FONTS.medium,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
