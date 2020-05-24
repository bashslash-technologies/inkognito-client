import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import WelcomeScreen from '../screens/welcome';
import RegisterNav from './registerNav';
import LoginNav from './loginNav';

const AuthNavigator = props => {
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name={'Welcome'}
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'loginRoot'}
          component={LoginNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'registerRoot'}
          component={RegisterNav}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(AuthNavigator);
