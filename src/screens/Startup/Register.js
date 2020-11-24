import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONTS, BORDER_RADIUS} from '../../constants';
import {Divider, Input} from 'react-native-elements';
import {
  EyeOff,
  EyeOn,
  PasswordIcon,
  UsernameIcon,
  VectorRegister,
} from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();
  const [dataSource, setDataSource] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const iconWidth = 24;
  const iconHeight = 24;

  const getDataBase = () => {
    fetch('http://192.168.100.12:4090/users', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
      });
  };

  const register = () => {
    Axios.post('http://192.168.100.12:4090/register', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
    });
    alert('Succesfull Signup');
    setUsername(null);
    setPassword(null);
    getDataBase();
  };

  const ToggleVisibility = () => {
    if (!passwordVisibility) {
      return (
        <EyeOn
          width={iconWidth}
          height={iconHeight}
          onPress={() => handleTogglePasswordVisibility()}
        />
      );
    } else {
      return (
        <EyeOff
          width={iconWidth}
          height={iconHeight}
          onPress={() => handleTogglePasswordVisibility()}
        />
      );
    }
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <ScrollView
      style={styles.basecontainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <VectorRegister style={styles.vector} />
        </View>

        <View style={styles.header}>
          <Text style={styles.Minititle}>Welcome to Darlene Shop</Text>
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            leftIcon={<UsernameIcon width={iconWidth} height={iconHeight} />}
            placeholder="Username"
            style={styles}
            onChangeText={(value) => setUsername(value)}
            value={username}
            inputContainerStyle={{borderColor: COLORS.primary}}
            inputStyle={{fontFamily: FONTS.regular, fontSize: SIZES.body3}}
            maxLength={8}
          />
          <View style={{marginTop: 5, marginBottom: 15}}>
            <Input
              leftIcon={<PasswordIcon width={iconWidth} height={iconHeight} />}
              placeholder="Password"
              style={styles}
              onChangeText={(value) => setPassword(value)}
              value={password}
              secureTextEntry={passwordVisibility}
              inputContainerStyle={{borderColor: COLORS.primary}}
              inputStyle={{fontFamily: FONTS.regular, fontSize: SIZES.body3}}
              rightIcon={<ToggleVisibility />}
            />
          </View>
        </View>

        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            style={styles.buttonViewProduk}
            onPress={() => register()}>
            <Text style={styles.labelButtonViewData}>Register</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <Divider
              style={{backgroundColor: COLORS.primary, height: 1, width: '45%'}}
            />
            <Text style={{fontFamily: FONTS.regular, fontSize: SIZES.default}}>
              Or
            </Text>
            <Divider
              style={{backgroundColor: COLORS.primary, height: 1, width: '45%'}}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonViewProduk}
            onPress={() =>
              navigation.navigate('Login', {
                getData: getDataBase,
              })
            }>
            <Text style={styles.labelButtonViewData}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', marginTop: 17, marginBottom: 30}}>
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.body2,
            }}>
            By Signing in you agree to our Terms of Service
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  basecontainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  container: {
    paddingHorizontal: 35,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: 45,
    marginBottom: 33,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h2,
    marginLeft: 10,
  },
  Minititle: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body1,
    marginLeft: 10,
  },
  buttonViewProduk: {
    width: 325,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: BORDER_RADIUS.regular,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'center',
  },
  labelButtonViewData: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.h3,
    color: COLORS.white,
  },
  vector: {
    marginTop: 30,
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14.56,
  },
  footerButtonContainer: {
    justifyContent: 'space-between',
  },
});
