import React, {Fragment, useContext} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
const Stack = createStackNavigator();
import CartComponent from '../screens/cart';
import InvoiceComponent from '../screens/cart/invoicePage';
import PaymentComponent from '../screens/cart/OrderPayment';
import Colors from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import ButtonComponent from '../components/button';
import {CartContext} from '../context/cart';

const CartStack = props => {
  const {cart} = useContext(CartContext);
  const nav = useNavigation();
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
                    <ButtonComponent onPress={() => nav.navigate('Invoice')}>
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
        <Stack.Screen
          options={({}) => ({
            title: 'Invoice',
            headerStyle: {backgroundColor: Colors.primaryColor},
            headerTitleStyle: {color: Colors.white},
            headerBackTitleStyle: {color: Colors.white},
          })}
          name="Invoice"
          component={InvoiceComponent}
        />
        <Stack.Screen
          options={({}) => ({
            title: 'Payment',
            headerStyle: {backgroundColor: Colors.primaryColor},
            headerTitleStyle: {color: Colors.white},
            headerBackTitleStyle: {color: Colors.white},
          })}
          name="Payment"
          component={PaymentComponent}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(CartStack);
