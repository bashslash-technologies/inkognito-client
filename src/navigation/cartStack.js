import React, {Fragment, useContext} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import CartComponent from '../screens/cart';
import Colors from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import ButtonComponent from '../components/button';
import {CartContext} from '../context/cart';

const CartStack = props => {
  const {cart} = useContext(CartContext);
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name={'Cart'}
          options={{
            headerStyle: {backgroundColor: Colors.primaryColor},
            headerTitleStyle: {color: Colors.white},
            headerRight: ({navigation}) => {
              return (
                <Fragment>
                  {cart.length ? (
                    <ButtonComponent onPress={() => alert('hello')}>
                      <Feather name={'check'} size={27} color={Colors.white} />
                    </ButtonComponent>
                  ) : null}
                </Fragment>
              );
            },
            headerRightContainerStyle: {marginRight: RFValue(13)},
          }}
          component={CartComponent}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(CartStack);
