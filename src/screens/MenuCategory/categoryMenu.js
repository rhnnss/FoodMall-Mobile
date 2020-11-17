import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import categoryItem from './categoryItem';

const categoryMenu = () => {
  const [categoryBreakfast, setCategoryBreakfast] = useState([]);
  const [categoryBeef, setCategoryBeef] = useState([]);
  const [categoryChicken, setCategoryChicken] = useState([]);
  const [categoryFish, setCategoryFish] = useState([]);
  const [categorySnacks, setCategorySnacks] = useState([]);
  const [categoryIceCream, setCategoryIceCream] = useState([]);

  useEffect(() => {
    getCategoryBreakfast();
    getCategoryBeef();
    getCategoryChicken();
    getCategoryFish();
    getCategoryIceCream();
    getCategorySnacks();
  }, []);

  const getCategoryBreakfast = () => {
    Axios.get('http://192.168.100.12:4090/categoryBreakfast')
      .then((response) => response.json())
      .then((responseJson) => setCategoryBreakfast(responseJson));
  };
  const getCategoryBeef = () => {
    Axios.get('http://192.168.100.12:4090/categoryBeef')
      .then((response) => response.json())
      .then((responseJson) => setCategoryBeef(responseJson));
  };
  const getCategoryChicken = () => {
    Axios.get('http://192.168.100.12:4090/categoryChicken')
      .then((response) => response.json())
      .then((responseJson) => setCategoryChicken(responseJson));
  };
  const getCategoryFish = () => {
    Axios.get('http://192.168.100.12:4090/categoryFish')
      .then((response) => response.json())
      .then((responseJson) => setCategoryFish(responseJson));
  };
  const getCategoryIceCream = () => {
    Axios.get('http://192.168.100.12:4090/categoryIceCream')
      .then((response) => response.json())
      .then((responseJson) => setCategoryIceCream(responseJson));
  };
  const getCategorySnacks = () => {
    Axios.get('http://192.168.100.12:4090/categorySnacks')
      .then((response) => response.json())
      .then((responseJson) => setCategorySnacks(responseJson));
  };

  return (
    <View>
      <categoryItem data={categoryBreakfast} />
      <categoryItem data={categoryBeef} />
      <categoryItem data={categoryChicken} />
      <categoryItem data={categoryFish} />
      <categoryItem data={categoryIceCream} />
      <categoryItem data={categorySnacks} />
    </View>
  );
};

export default categoryMenu;

const styles = StyleSheet.create({});
