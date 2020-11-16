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
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {
  SortAbjad,
  SortLower,
  SortHigh,
  Close,
  Check,
} from '../../constants/icons';
import {BORDER_RADIUS} from '../../constants/themes';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceHeight = Dimensions.get('window').height;

export default class AdressDeliveryModal extends Component {
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
      ],
      name: null,
      address: null,
    };
  }

  show = () => {
    this.setState({show: true});
  };

  close = () => {
    this.setState({show: false});
  };

  // ---------------------------------- Render Outside Touchable  ----------------------------------
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

  // ---------------------------------- Render Title  ----------------------------------
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

        {/* <TouchableOpacity style={{position: 'absolute', top: 30, right: 20}}>
          <Check width={35} height={35} />
        </TouchableOpacity> */}
      </View>
    );
  };

  // ---------------------------------- Common Render  ----------------------------------
  render() {
    let {show} = this.state;
    const {onTouchOutside, getName, getAddress} = this.props;

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
            {/*---------------- Input ---------------- */}
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}>
              <View>
                <Input
                  label="Nama Penerima"
                  labelStyle={{fontFamily: FONTS.medium, fontSize: SIZES.h2}}
                  placeholder="Your name"
                  inputStyle={{
                    fontFamily: FONTS.regular,
                    fontSize: SIZES.h2,
                  }}
                  onChangeText={(value) => getName(value)}
                  value={this.state.name}
                />
              </View>
              <View>
                <Input
                  label="Alamat Pengiriman"
                  labelStyle={{fontFamily: FONTS.medium, fontSize: SIZES.h2}}
                  placeholder="Delivery adress"
                  inputStyle={{fontFamily: FONTS.regular, fontSize: SIZES.h2}}
                  onChangeText={(value) => getAddress(value)}
                  value={this.state.address}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({});
