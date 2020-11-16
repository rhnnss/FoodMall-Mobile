import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from '../src/router';
import {Provider} from 'react-redux';
import store from '../src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
