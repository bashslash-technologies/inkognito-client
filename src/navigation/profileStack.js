import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import ProfileComponent from '../screens/profile';
import Colors from '../constants/colors';

const ProfileStack = props => {
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name={'Profile'}
          options={{
            headerStyle: {backgroundColor: Colors.primaryColor},
            headerTitleStyle: {color: Colors.white},
          }}
          component={ProfileComponent}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(ProfileStack);
