import React, {Fragment, useContext} from 'react';
import {StatusBar, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import SettingsComponent from '../screens/settings/settings';
import Colors from '../constants/colors';
import ButtonComponent from '../components/button';
import Feather from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from './appNavigator';

const SettingseStack = props => {
  const [{signOut}] = useContext(AuthContext);

  const HandleSignout = async () => {
    await signOut();
  };
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name={'Settings'}
          options={{
            headerStyle: {backgroundColor: Colors.primaryColor},
            headerTitleStyle: {color: Colors.white},
            headerRight: ({navigation}) => {
              return (
                <Fragment>
                  <ButtonComponent
                    onPress={() =>
                      Alert.alert(
                        'Logout Request',
                        'Are you sure you want to logout',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => null,
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: HandleSignout,
                          },
                        ],
                        {cancelable: false},
                      )
                    }>
                    <Feather name={'log-out'} size={22} color={Colors.white} />
                  </ButtonComponent>
                </Fragment>
              );
            },
            headerRightContainerStyle: {marginRight: RFValue(13)},
          }}
          component={SettingsComponent}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(SettingseStack);
