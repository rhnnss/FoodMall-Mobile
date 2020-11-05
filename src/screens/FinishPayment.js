import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Badge} from 'react-native-elements';
import {COLORS} from '../constants';

const FinishPayment = () => {
  const deviceWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Batas Akhir Pembayaranmu</Text>
        <Text style={styles.date}>Minggu, 27 Sep 2020</Text>
        <Divider
          style={{
            backgroundColor: COLORS.black,
            height: 2,
            width: deviceWidth * 0.5,
          }}
        />
        <Text style={styles.labelTotal}>Total Pembayaran</Text>
        <Text style={styles.valuePembayaran}>Rp 7.800.000</Text>
      </View>

      <TouchableOpacity style={styles.cardPayment}>
        <View>
          <Text style={styles.noRekening}>8080 0896 2004 4956</Text>
          <Text style={styles.labelCardHolder}>CARD HOLDER</Text>
          <Text style={styles.valueCardHolder}>PT DARLENE SHOP</Text>
        </View>
        <View style={styles.miniCircle}>
          <Badge status="white" />
          <Badge status="white" />
          <Badge status="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FinishPayment;

const styles = StyleSheet.create({});
