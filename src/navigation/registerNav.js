import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import RegisterComponent from '../screens/register';
import {VerifyRegistration} from '../screens/verify';
import SuccessPage from '../screens/success/success';

const RegisterNav = props => {
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name={'register'}
          component={RegisterComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'verifyRegister'}
          component={VerifyRegistration}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'success'}
          component={SuccessPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(RegisterNav);
