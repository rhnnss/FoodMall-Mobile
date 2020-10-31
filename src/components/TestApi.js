import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';

export default class TestApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataBase: [],
    };
  }

  componentDidMount() {
    fetch('http://192.168.100.12:4090/newProducts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataBase: responseJson,
        });
      });
  }

  renderItem = ({item, index}) => {
    return (
      <View>
        <Image source={{uri: item.icon}} style={{width: 150, height: 150}} />
        <Text>{item.nama}</Text>
        <Text>{item.harga}</Text>
      </View>
    );
  };

  render() {
    let {isLoading} = this.state;

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <FlatList
            data={this.state.dataBase}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({});
