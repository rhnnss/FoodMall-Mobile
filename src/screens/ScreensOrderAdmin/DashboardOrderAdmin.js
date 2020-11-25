import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ButtonForOrderAdmin} from '../../components';
import {COLORS, FONTS, SIZES} from '../../constants';
import {LargeAvatar} from '../../constants/images';

const DashboardOrderAdmin = ({route}) => {
  const {username} = route.params;

  const navigation = useNavigation();

  const _logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.Avatar}>
        <Image source={LargeAvatar} />
        <Text style={styles.user}>{username}</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <View>
          <Text style={styles.title}>Produk</Text>
          <ButtonForOrderAdmin
            type="Package"
            navigate="Produk"
            title="Produk anda"
            desc="Lihat dan atur semua produk"
            role="YellowButton"
          />
        </View>
        <View>
          <Text style={styles.title}>Pesanan</Text>
          <ButtonForOrderAdmin
            type="Package"
            navigate="Pesanan"
            title="Pesanan baru"
            desc="Ayo segera selesaikan daftar pesanan pelanggan"
            role="YellowButton"
          />
        </View>
      </View>

      <View style={styles.logoutContainer}>
        <ButtonForOrderAdmin role="Logout" logoutFunc={() => _logout()} />
      </View>
    </View>
  );
};

export default DashboardOrderAdmin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: '100%',
    paddingHorizontal: 35,
  },
  Avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
    marginTop: -80,
  },
  title: {
    marginTop: 10,
    fontFamily: FONTS.medium,
    fontSize: SIZES.h2,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  logoutContainer: {
    marginTop: 30,
  },
});
