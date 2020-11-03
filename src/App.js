import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from '../src/router';
import {Provider as StoreProvider} from 'react-redux';
import store from '../src/redux/store';

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
