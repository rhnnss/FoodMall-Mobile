export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const PLUS_HANDLE = 'PLUS_HANDLE';
export const MINUS_HANDLE = 'MINUS_HANDLE';
export const TOTAL_COUNTER = 'TOTAL_COUNTER';

const initialState = [];

const cartItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem.id !== action.payload.id);
  }
  return state;
};

export default cartItemReducer;
