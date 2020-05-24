import React, {Fragment} from 'react';
import 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import AppNavigator from './src/navigation/appNavigator';

const App = () => {
  return (
    <Fragment>
      <AppNavigator />
      <FlashMessage />
    </Fragment>
  );
};

export default App;
