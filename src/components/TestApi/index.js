import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, images, SIZES} from '../../constants';
import {StarActive, StarNonActive} from '../../constants/icons';

export default class TestApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch('http://192.168.100.12:4070/randomProducts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        });
      });
  }

  renderItem = ({item}) => {
    const Star = () => {
      if (item.star === '5')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
          </View>
        );
      if (item.star === '4')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
            <StarNonActive />
          </View>
        );
      if (item.star === '3')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (item.star === '2')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (item.star === '1')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (item.star === '0')
        return (
          <View style={styles.rating}>
            <Text>Maaf Belum di Nilai!</Text>
          </View>
        );
    };

    return (
      <TouchableHighlight style={styles.card}>
        <>
          <View style={styles.head}>
            <Image source={images.Burger} />
            <View style={styles.detail}>
              <Text style={styles.labelTitle}>{item.name}</Text>
              <Text style={styles.valuePrice}>Rp.{item.price}</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Star />
          </View>
        </>
      </TouchableHighlight>
    );
  };

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
      return (
        <TouchableHighlight style={styles.container}>
          <View style={styles.button}>
            <Image source={images.Burger} />
            <View style={styles.info}>
              <Text style={styles.labelTitle}>{value.name}</Text>
              <Text style={styles.valuePrice}>Rp.{value.price}</Text>
            </View>
            <Star />
          </View>
        </TouchableHighlight>
      );
    });

    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: -20,
        }}>
        {/* <FlatList
          style={styles.container}
          numColumns={2}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        /> */}

        {modul}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
