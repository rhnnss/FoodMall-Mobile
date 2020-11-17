import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {SearchIcon} from '../../constants/icons';

const Search = () => {
  return (
    <View style={styles.container}>
      <SearchIcon width={20} height={20} style={styles.search} />
      <TextInput style={styles.input} placeholder="Searchh" />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: 358.71,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
    marginTop: 28,
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body1,
    paddingLeft: 40,
    paddingRight: 50,
  },
  search: {
    left: 20,
  },
});
