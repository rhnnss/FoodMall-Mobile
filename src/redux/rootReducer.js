import {combineReducers} from 'redux';
import shopReducer from './Shopping/Shopping-reducer';
import usernameReducer from './Username/Username-reducer';

const rootReducer = combineReducers({
  shop: shopReducer,
  userData: usernameReducer,
});

export default rootReducer;
