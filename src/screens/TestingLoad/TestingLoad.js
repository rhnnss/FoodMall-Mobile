// import React, {useEffect, useState} from 'react';
// import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

// const TestingLoad = () => {
//   const [masterDataSource, setMasterDataSource] = useState([]);

//   useEffect(() => {
//     const url = 'http://jsonplaceholder.typicode.com/photos?_limit=10';
//     fetch(url)
//       .then((res) => res.json())
//       .then((resJson) => setMasterDataSource(resJson));
//   }, []);

//   const renderProduct = ({item}) => {
//     return (
//       <View>
//         <Image source={{uri: item.url}} resizeMode="contain" />
//         <Text>{item.title}</Text>
//       </View>
//     );
//   };

//   return (
//     <View>
//       <FlatList
//         style={styles.container}
//         data={masterDataSource}
//         renderItem={renderProduct}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default TestingLoad;

// const styles = StyleSheet.create({});
