import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
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
import {ButtonForOrderAdmin} from '../../components';
import {COLORS, FONTS, SIZES, BORDER_RADIUS} from '../../constants';
import {Package} from '../../constants/icons';
import {CourierAdminAvatar} from '../../constants/images';

const DashboardOrderAdmin = ({route}) => {
  const {username} = route.params;
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('http://192.168.100.12:4090/courierPackage')
      .then((response) => response.json())
      .then((responseJson) => {
        setMasterDataSource(responseJson);
        console.log(responseJson);
      });
  };

  let PackageWidth = 34;
  let PackageHeight = 34;

  const _logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Register');
  };

  const RenderItems = ({item}) => {
    return (
      <TouchableOpacity style={styles.button}>
        <Package width={PackageWidth} height={PackageHeight} />
        <View style={styles.textContainer}>
          <Text style={styles.labelButton}>{item.name}</Text>
          <Text style={styles.valueButton}>{item.adress}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.labelValueButtonPengiriman}>Pengiriman</Text>
            <Text style={styles.valueButtonPengiriman}>{item.delivery}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.Avatar}>
        <Image source={CourierAdminAvatar} />
        <Text style={styles.user}>{username}</Text>
      </TouchableOpacity>

      <ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={true}>
        <View style={styles.buttonContainer}>
          <View>
            <FlatList
              data={masterDataSource}
              keyExtractor={(item, index) => index.toString()}
              renderItem={RenderItems}
            />
          </View>
        </View>
      </ScrollView>

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
    marginTop: 20,
  },
  user: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
    marginTop: -40,
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
  button: {
    width: 325,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: BORDER_RADIUS.regular,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textContainer: {
    marginLeft: 15,
  },
  labelButton: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h3,
    color: COLORS.white,
  },
  valueButton: {
    width: 240,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body2,
    color: COLORS.white,
  },
  valueButtonPengiriman: {
    width: 262,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body2,
    color: COLORS.white,
    marginLeft: 7,
  },
  labelValueButtonPengiriman: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.body2,
    color: COLORS.white,
  },
});
