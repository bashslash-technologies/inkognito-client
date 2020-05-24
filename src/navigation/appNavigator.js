import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  Fragment,
  useReducer,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './authNavigator';
import OnBoardScreen from '../screens/onBoard';
import {createStackNavigator} from '@react-navigation/stack';
import Store from '../services/index';
import mainNav from './mainNav';
const Stack = createStackNavigator();
import LoadingComponent from './loading';

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoard"
        component={OnBoardScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export const AuthContext = createContext();
const Manipulator = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.userToken,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

const AppNavigator = props => {
  const [data, setData] = useState(null);
  const [state, dispatch] = useReducer(Manipulator, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    (async () => {
      let userToken;
      try {
        let data = await Store.getToken('@onBoard');
        setData(data);
        userToken = await Store.getToken('@user_token');
      } catch (e) {
        console.warn(e.message);
      }
      //dispatch the token into context
      dispatch({
        type: 'RESTORE_TOKEN',
        userToken: JSON.parse(userToken),
      });
    })();
  }, [data]);

  const authContextController = useMemo(
    () => ({
      signIn: async data => {
        try {
          await Store.storeToken('@user_token', JSON.stringify(data));
          dispatch({type: 'SIGN_IN', token: data});
        } catch (e) {
          console.warn(e);
        }
      },
      signOut: async () => {
        try {
          await Store.storeToken('@user_token', null);
          dispatch({type: 'SIGN_OUT'});
        } catch (e) {
          console.log(e.message);
        }
      },
    }),
    [],
  );

  return (
    <>
      {state.isLoading ? (
        <LoadingComponent />
      ) : (
        <AuthContext.Provider value={[authContextController, state]}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={'OnBoard'}>
              {data === null && (
                <Stack.Screen
                  name={'OnBoard'}
                  component={Root}
                  options={{
                    headerShown: false,
                  }}
                />
              )}
              {state.userToken === null ? (
                <Stack.Screen
                  name={'Auth'}
                  component={AuthNavigator}
                  options={{
                    headerShown: false,
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
              ) : (
                <Stack.Screen
                  name={'MainNav'}
                  component={mainNav}
                  options={{headerShown: false}}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      )}
    </>
  );
};

export default AppNavigator;
