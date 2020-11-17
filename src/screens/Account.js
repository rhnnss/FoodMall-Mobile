import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images, FONTS, SIZES, COLORS} from '../constants';
import {BORDER_RADIUS} from '../constants/themes';

const Account = () => {
  return (
    <ScrollView style={{backgroundColor: COLORS.white}}>
      <View style={styles.container}>
        {/* ---------------------------- Header ---------------------------- */}
        <View style={styles.header}>
          <View>
            <Image source={images.BigAvatar} style={styles.avatar}></Image>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerLabel}>Hey, Albert Flores</Text>
            <Text style={styles.headerValue}>Let’s find quality food</Text>
          </View>
        </View>

        {/* ---------------------------- Description ---------------------------- */}
        <View style={styles.contents}>
          <Text style={styles.contentsLabel}>About Darlene Shop Indonesia</Text>
          <Text style={styles.contentsValue}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci
            convallis elit quis risus, sit massa. Viverra adipiscing sit nunc
            egestas. Egestas sit lobortis vel viverra in commodo et augue. Ipsum
            nisl est facilisis lectus lectus tellus nec adipiscing. Aliquam
            blandit amet mauris.
          </Text>
        </View>

        {/* ---------------------------- Log Out ---------------------------- */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.buttonValue}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
  },
  avatar: {
    width: 173.32,
    height: 202.4,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  headerTextContainer: {
    marginTop: -20,
    alignItems: 'center',
  },
  headerLabel: {
    fontFamily: FONTS.medium,
    color: COLORS.grey,
    fontSize: SIZES.h11,
  },
  headerValue: {
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    fontSize: SIZES.body3,
  },
  contents: {
    marginTop: 74,
  },
  contentsLabel: {
    fontFamily: FONTS.medium,
    color: COLORS.grey,
    fontSize: SIZES.h3,
  },
  contentsValue: {
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    fontSize: SIZES.body1,
    textAlign: 'left',
    marginTop: 15,
  },
  logoutButton: {
    paddingHorizontal: 137,
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.default,
    marginTop: 63,
  },
  buttonValue: {
    fontFamily: FONTS.medium,
    color: COLORS.white,
    fontSize: SIZES.body1,
  },
});
