import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {SortAbjad, SortLower, SortHigh, Close} from '../../constants/icons';
import {BORDER_RADIUS} from '../../constants/themes';

const deviceHeight = Dimensions.get('window').height;

export default class ShippingMethodModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dataSource: [
        {
          id: 1,
          name: 'Grab',
          price: 45000,
        },
        {
          id: 2,
          name: 'Gojek',
          price: 25000,
        },
        {
          id: 3,
          name: 'Kurir Toko',
          price: 15000,
        },
      ],
    };
  }

  show = () => {
    this.setState({show: true});
  };

  close = () => {
    this.setState({show: false});
  };

  renderOutsideTouchable(onTouch) {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  renderTitle = () => {
    const {title, onTouchOutside} = this.props;

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 30,
          marginBottom: 25,
          justifyContent: 'flex-start',
          paddingHorizontal: 15,
        }}>
        <TouchableOpacity onPress={onTouchOutside}>
          <Close width={35} height={35} />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.h1,
            fontFamily: FONTS.medium,
            marginLeft: 20,
          }}>
          {title}
        </Text>
      </View>
    );
  };

  renderContent = () => {
    const {dataSource} = this.state;

    return (
      // {*----------------- FlatList -----------------*/}
      <View>
        <FlatList
          style={{marginBottom: 20}}
          showsVerticalScrollIndicator={false}
          data={dataSource}
          renderItem={this.renderItem}
          extraData={dataSource}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        />
      </View>
    );
  };

  renderItem = ({item}) => {
    const convertToRupiah = (angka) => {
      var rupiah = '';
      var angkarev = angka.toString().split('').reverse().join('');
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
      return (
        'Rp. ' +
        rupiah
          .split('', rupiah.length - 1)
          .reverse()
          .join('')
      );
    };

    return (
      <ScrollView>
        <View
          style={{
            height: 50,
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 22,
            paddingVertical: 35,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.greyLight2,
            borderRadius: BORDER_RADIUS.regular,
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.h2,
              fontFamily: FONTS.medium,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.h2,
              fontFamily: FONTS.medium,
            }}>
            {convertToRupiah(item.price)}
          </Text>
        </View>
      </ScrollView>
    );
  };

  render() {
    let {show} = this.state;
    const {onTouchOutside} = this.props;

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.blackTransparant,
            justifyContent: 'flex-end',
          }}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              backgroundColor: COLORS.white,
              width: '100%',
              borderTopRightRadius: 14,
              borderTopLeftRadius: 14,
              paddingHorizontal: 10,
              maxHeight: deviceHeight * 0.5,
            }}>
            {this.renderTitle()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({});
