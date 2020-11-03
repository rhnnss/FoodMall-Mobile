import {createStore} from 'redux';
import cartItemReducer from './CartItem';

const store = createStore(cartItemReducer);

export default store;
