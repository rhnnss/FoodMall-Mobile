import * as UsernameTypes from '../Username/Username-types';

const INTIAL_STATE = {
  username: '',
  old_username: '',
};

const usernameReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case UsernameTypes.GET_USERNAME:
      return {
        old_username: state.username || '',
        username: action.payload.username,
      };
    default:
      return state;
  }
};

export default usernameReducer;
