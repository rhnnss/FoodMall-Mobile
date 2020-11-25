import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES, FONTS, BORDER_RADIUS} from '../../constants';
import {ButtonForOrderAdmin} from '../../components';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const UpdateProduct = ({route}) => {
  const {paramValue, autoReload} = route.params;
  const navigation = useNavigation();

  const [dataSource, setDataSource] = useState([]);
  const [dataId, setDataId] = useState(paramValue.id);
  const [background, setBackground] = useState(paramValue.background);
  const [icon, setIcon] = useState(paramValue.icon);
  const [nama, setNama] = useState(paramValue.nama);
  const [harga, setHarga] = useState(paramValue.harga);
  const [desc, setDesc] = useState(paramValue.deskripsi);
  const [star, setStar] = useState(paramValue.star);
  const [role, setRole] = useState(paramValue.role);

  const buttonUpdate = () => {
    fetch('http://192.168.100.12:4090/OrderAdmin', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        background: background,
        icon: icon,
        nama: nama,
        harga: harga,
        deskripsi: desc,
        star: star,
        id: dataId,
        role: role,
      }),
    }).then((response) => {
      autoReload();
      return response.json();
    });
    setBackground(null);
    setDataId(null);
    setIcon(null);
    setNama(null);
    setHarga(null);
    setDesc(null);
    setStar(null);
    setRole(null);
    navigation.navigate('AllProduk');
  };

  return (
    <ScrollView
      style={styles.basecontainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ButtonForOrderAdmin role="ArrowBack" navigate="AllProduk" />
          <Text style={styles.title}>Edit Product</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Background (default)"
            placeholder="Background URL"
            style={styles}
            onChangeText={(value) => setBackground(value)}
            value={background}
          />
          <Input
            label="Icon / Menu Image"
            placeholder="Your icon URL"
            style={styles}
            onChangeText={(value) => setIcon(value)}
            value={icon}
          />
          <Input
            label="Name"
            placeholder="Your menu name"
            style={styles}
            onChangeText={(value) => setNama(value)}
            value={nama}
          />
          <Input
            label="Description"
            placeholder="Your menu description"
            style={styles}
            onChangeText={(value) => setDesc(value)}
            value={desc}
          />
          <Input
            label="Price"
            placeholder="Your menu price"
            style={styles}
            onChangeText={(value) => setHarga(value)}
            value={harga}
          />
          <Input
            label="Star"
            placeholder="Star value"
            style={styles}
            onChangeText={(value) => setStar(value)}
            value={star}
          />
          <Input
            label="Role"
            placeholder="Role value"
            style={styles}
            onChangeText={(value) => setRole(value)}
            value={role}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonViewProduk}
          onPress={() => buttonUpdate()}>
          <Text style={styles.labelButtonViewData}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateProduct;

const styles = StyleSheet.create({
  buttonViewProduk: {
    width: 368,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingLeft: 21,
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  labelButtonViewData: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.h3,
    color: COLORS.white,
  },

  basecontainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  container: {
    paddingHorizontal: 22,
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
});
