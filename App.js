import React, {Fragment} from 'react';
import 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import AppNavigator from './src/navigation/appNavigator';
import CartContext from './src/context/cart';

const App = () => {
  return (
    <Fragment>
      <CartContext>
        <AppNavigator />
        <FlashMessage />
      </CartContext>
    </Fragment>
  );
};

export default App;
