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
import {SortAbjad, SortLower, SortHigh} from '../../constants/icons';

const deviceHeight = Dimensions.get('window').height;

export default class SortModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dataSource: [
        {
          id: 1,
          name: 'Sortby A to Z',
        },
        {
          id: 2,
          name: 'Sortby Higher Price',
        },
        {
          id: 3,
          name: 'Sortby Lower Price',
        },
      ],
    };
  }
  z;

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
    const {title} = this.props;
    return (
      <View>
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.h1,
            fontFamily: FONTS.medium,
            margin: 15,
          }}>
          {title}
        </Text>
      </View>
    );
  };

  renderContent = () => {
    const {dataSource} = this.state;

    return (
      <View>
        <FlatList
          style={{marginBottom: 20}}
          showsVerticalScrollIndicator={false}
          data={dataSource}
          renderItem={this.renderItem}
          extraData={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      </View>
    );
  };

  renderItem = ({item}) => {
    const Icons = () => {
      if (item.id === 1) {
        return <SortAbjad width={20} height={20} />;
      }
      if (item.id === 2) {
        return <SortHigh width={24} height={24} />;
      }
      if (item.id === 3) {
        return <SortLower width={24} height={24} />;
      }
    };

    return (
      <TouchableOpacity
        style={{
          height: 50,
          flex: 1,
          alignItems: 'center',
          marginLeft: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Icons />
        <Text
          style={{
            color: COLORS.black,
            fontSize: SIZES.h2,
            fontFamily: FONTS.medium,
            marginLeft: 20,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return (
      <View style={{opacity: 0.1, backgroundColor: COLORS.grey, height: 2}} />
    );
  };

  render() {
    let {show} = this.state;
    const {onTouchOutside, title} = this.props;

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
              maxHeight: deviceHeight * 0.4,
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
