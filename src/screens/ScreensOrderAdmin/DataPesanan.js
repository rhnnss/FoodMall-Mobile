import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ButtonForOrderAdmin} from '../../components';
import {COLORS, FONTS, SIZES} from '../../constants';

const DataPesanan = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ButtonForOrderAdmin role="ArrowBack" navigate="Home" />
        <Text style={styles.title}>Pesanan Baru</Text>
      </View>

      <ScrollView style={{height: 600}} showsVerticalScrollIndicator={false}>
        <View style={styles.buttonContainer}>
          <ButtonForOrderAdmin
            type="Package"
            navigate="DetailPesanan"
            title="Produk anda"
            desc="Lihat dan atur semua produk"
            role="NewOrder"
          />
          <ButtonForOrderAdmin
            type="Package"
            navigate="DetailPesanan"
            title="Produk anda"
            desc="Lihat dan atur semua produk"
            role="NewOrder"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DataPesanan;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    height: '100%',
    backgroundColor: COLORS.white,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 38,
    marginBottom: 33,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h2,
    marginLeft: 80,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
