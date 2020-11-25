import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';
import {ButtonForOrderAdmin} from '../../components';
import {Input} from 'react-native-elements';

const Produk = () => {
  const [dataSource, setDataSource] = useState([]);
  const [background, setBackground] = useState(
    'https://i.imgur.com/d9kvguM.png',
  );
  const [dataId, setDataId] = useState(null);
  const [icon, setIcon] = useState(null);
  const [nama, setNama] = useState(null);
  const [harga, setHarga] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(null);
  const [role, setRole] = useState(null);

  const saveButton = () => {
    fetch('http://192.168.100.12:4090/OrderAdmin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        icon: icon,
        background: background,
        nama: nama,
        harga: harga,
        deskripsi: desc,
        star: star,
        role: role,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert('Succesfull Add Data');
        setDataSource(responseJson);
      })
      .done();
    setDataId(null);
    setIcon(null);
    setNama(null);
    setHarga(null);
    setDesc(null);
    setStar(null);
    setRole(null);
  };

  return (
    <ScrollView
      style={styles.basecontainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ButtonForOrderAdmin role="ArrowBack" navigate="Home" />
          <Text style={styles.title}>Pesanan Baru</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Background (default)"
            placeholder="Comment"
            style={styles}
            onChangeText={(value) => setBackground(value)}
            value={background}
          />
          <Input
            label="Icon / Menu Image"
            placeholder="Your icon link"
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

        <View style={styles.ViewDataContainer}>
          <ButtonForOrderAdmin role="ViewData" navigate="ViewData" />
        </View>
        <View style={styles.ViewDataContainer}>
          <ButtonForOrderAdmin
            role="Save"
            func={saveButton}
            data={dataSource}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Produk;

const styles = StyleSheet.create({
  basecontainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  container: {
    paddingHorizontal: 35,
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
