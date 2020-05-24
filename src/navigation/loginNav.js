import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {VerifyForgot} from '../screens/verify';
import LoginComponent from '../screens/login';
import ResetComponent from '../screens/reset';

const LoginNav = props => {
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name={'login'}
          component={LoginComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'verifyForgot'}
          component={VerifyForgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'reset'}
          component={ResetComponent}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(LoginNav);
