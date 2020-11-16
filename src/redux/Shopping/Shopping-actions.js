import * as actionTypes from './Shopping-types';
import * as ProductTypes from '../Products/Products-types';

// this function will call in dispatch
export const addToCart = (itemID) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const addQty = (itemID, value) => {
  return {
    type: actionTypes.ADD_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const subQty = (itemID, value) => {
  return {
    type: actionTypes.SUB_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

//  --------------------------------- GET PRODUCT DATA FROM DATABASE ---------------------------------
export const getProducts = () => {
  return {
    type: ProductTypes.GET_PRODUCTS,
  };
};

export const getProductsSuccess = (datas) => {
  return {
    type: ProductTypes.GET_PRODUCTS_SUCCESS,
    payload: datas,
  };
};

export const getProductsFailed = () => {
  return {
    type: ProductTypes.GET_PRODUCTS_FAILED,
  };
};

export function fecthProducts(dispatch) {
  return async (dispatch) => {
    dispatch(getProducts());
    try {
      const res = await fetch('http://192.168.100.12:4090/newProducts ');
      const data = await res.json();
      dispatch(getProductsSuccess(data));
    } catch (e) {
      dispatch(getProductsFailed());
    }
  };
}
