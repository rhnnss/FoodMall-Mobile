import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {SearchIcon} from '../../constants/icons';

const Search = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.baseContainer}
      onPress={() => navigation.navigate('SearchInHome')}>
      <View style={styles.container}>
        <SearchIcon width={20} height={20} style={styles.search} />
        <Text style={styles.input}>Search</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Search;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginTop: 28,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body1,
    color: COLORS.greyLight,
    paddingLeft: '39%',
  },
  search: {
    left: 20,
  },
});
