// import {response} from 'express';
// import React from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {COLORS, FONTS, images, SIZES} from '../../constants';
// import {StarActive, StarNonActive} from '../../constants/icons';

// const RandomProduct = ({title, price, star}) => {
//   const Star = () => {
//     if (star === '5')
//       return (
//         <View style={styles.rating}>
//           <StarActive />
//           <StarActive />
//           <StarActive />
//           <StarActive />
//           <StarActive />
//         </View>
//       );
//     if (star === '4')
//       return (
//         <View style={styles.rating}>
//           <StarActive />
//           <StarActive />
//           <StarActive />
//           <StarActive />
//           <StarNonActive />
//         </View>
//       );
//     if (star === '3')
//       return (
//         <View style={styles.rating}>
//           <StarActive />
//           <StarActive />
//           <StarActive />
//           <StarNonActive />
//           <StarNonActive />
//         </View>
//       );
//     if (star === '2')
//       return (
//         <View style={styles.rating}>
//           <StarActive />
//           <StarActive />
//           <StarNonActive />
//           <StarNonActive />
//           <StarNonActive />
//         </View>
//       );
//     if (star === '1')
//       return (
//         <View style={styles.rating}>
//           <StarActive />
//           <StarNonActive />
//           <StarNonActive />
//           <StarNonActive />
//           <StarNonActive />
//         </View>
//       );
//     if (star === '0')
//       return (
//         <View style={styles.rating}>
//           <Text>Maaf Belum di Nilai!</Text>
//         </View>
//       );
//   };

//   return (
//     <TouchableHighlight style={styles.container}>
//       <View style={styles.button}>
//         <Image source={images.Burger} />
//         <View style={styles.info}>
//           <Text style={styles.labelTitle}>{title}</Text>
//           <Text style={styles.valuePrice}>Rp.{price}</Text>
//         </View>
//         <Star />
//       </View>
//     </TouchableHighlight>
//   );
// };

// export default RandomProduct;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//   },
//   button: {
//     width: 182,
//     height: 278,
//     backgroundColor: COLORS.white,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.23,
//     shadowRadius: 2.62,
//     elevation: 6,
//     marginTop: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 14,
//   },
//   rating: {
//     flexDirection: 'row',
//     paddingTop: 14,
//     justifyContent: 'flex-end',
//   },
//   info: {
//     alignItems: 'center',
//     width: 129.25,
//     marginTop: 7,
//   },
//   labelTitle: {
//     textAlign: 'center',
//     fontFamily: FONTS.medium,
//     fontSize: SIZES.h2,
//   },
//   valuePrice: {
//     fontFamily: FONTS.medium,
//     fontSize: SIZES.h1,
//     marginTop: 7,
//   },
// });

import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, images, SIZES} from '../../constants';
import {StarActive, StarNonActive} from '../../constants/icons';

export default class RandomProduct extends Component {
  render() {
    const Star = () => {
      if (this.props.star === '5')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
          </View>
        );
      if (this.props.star === '4')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarActive />
            <StarNonActive />
          </View>
        );
      if (this.props.star === '3')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (this.props.star === '2')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (this.props.star === '1')
        return (
          <View style={styles.rating}>
            <StarActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
            <StarNonActive />
          </View>
        );
      if (this.props.star === '0')
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
            <Text style={styles.labelTitle}>{this.props.title}</Text>
            <Text style={styles.valuePrice}>Rp.{this.props.price}</Text>
          </View>
          <Star />
        </View>
      </TouchableHighlight>
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
