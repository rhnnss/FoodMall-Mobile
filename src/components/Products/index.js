import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, images, SIZES} from '../../constants';
import {StarActive, StarNonActive} from '../../constants/icons';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch('http://192.168.100.12:4090/newProducts')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      });
  }

  render() {
    let modul = this.state.dataSource.map((value) => {
      const Star = () => {
        if (value.star === '5')
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarActive />
              <StarActive />
              <StarActive />
              <StarActive />
            </View>
          );
        if (value.star === '4')
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarActive />
              <StarActive />
              <StarActive />
              <StarNonActive />
            </View>
          );
        if (value.star === '3')
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarActive />
              <StarActive />
              <StarNonActive />
              <StarNonActive />
            </View>
          );
        if (value.star === '2')
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarActive />
              <StarNonActive />
              <StarNonActive />
              <StarNonActive />
            </View>
          );
        if (value.star === '1')
          return (
            <View style={styles.rating}>
              <StarActive />
              <StarNonActive />
              <StarNonActive />
              <StarNonActive />
              <StarNonActive />
            </View>
          );
        if (value.star === '0')
          return (
            <View style={styles.rating}>
              <Text>Maaf Belum di Nilai!</Text>
            </View>
          );
      };

      console.log(value.icon);

      return (
        <TouchableHighlight style={styles.container} key={value.id}>
          <View style={styles.button}>
            <View style={styles.info}>
              <Text style={styles.labelTitle}>{value.nama}</Text>
              <Text style={styles.valuePrice}>Rp.{value.harga}</Text>
              <Image
                style={styles.Icon}
                source={require(value.icon)}
                resizeMode="contain"
              />
            </View>
            <Star />
          </View>
        </TouchableHighlight>
      );
    });

    let {isLoading} = this.state;

    if (isLoading) {
      <View>
        <ActivityIndicator size="large" animating />
      </View>;
    } else {
      return <View style={styles.page}>{modul}</View>;
    }
  }
}

const styles = StyleSheet.create({
  Icon: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: -20,
  },
  container: {
    flexDirection: 'column',
  },
  button: {
    width: 182,
    height: 278,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  rating: {
    flexDirection: 'row',
    paddingTop: 14,
    justifyContent: 'flex-end',
  },
  info: {
    alignItems: 'center',
    width: 129.25,
    marginTop: 7,
  },
  labelTitle: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: SIZES.h2,
  },
  valuePrice: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h1,
    marginTop: 7,
  },
});
