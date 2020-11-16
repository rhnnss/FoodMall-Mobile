import {applyMiddleware, createStore} from 'redux';
import cartItemReducer from './CartItem';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
