import * as actionTypes from './Shopping-types';
import * as ProductTypes from '../Products/Products-types';

const INITIAL_STATE = {
  products: [],
  loading: false,
  hasErrors: false,
  cart: [],
  currentItem: null,
  qty: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Get the items data from the product array
      const item = state.products.find((item) => item.id === action.payload.id);

      // Check if item in cart already or same product
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false,
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? {...item, qty: item.qty + 1}
                : item,
            )
          : [...state.cart, {...item, qty: 1}],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? {...item, qty: action.payload.qty}
            : item,
        ),
      };
    case actionTypes.ADD_QTY:
      return {
        ...state,
        cart: state.cart.find((item) =>
          item.id === action.payload.id
            ? [{...item, qty: action.payload.qty + 1}]
            : item,
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case ProductTypes.GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
      };
    case ProductTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        hasErrors: false,
      };
    case ProductTypes.GET_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
        hasErrors: false,
      };
    default:
      return state;
  }
};

export default shopReducer;
