import * as UsernameTypes from './Username-types';

export const getUsername = (username) => {
  return {
    type: UsernameTypes.GET_USERNAME,
    payload: {
      username: username,
    },
  };
};
