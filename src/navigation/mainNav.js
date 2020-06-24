import React, {Fragment, memo, useContext} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tabs = createBottomTabNavigator();
import Feather from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../constants/colors';
import HomeStack from './homeStack';
import CartStack from './cartStack';
import ProfileStack from './profileStack';
import SettingseStack from './settingsStack';
import {CartContext} from '../context/cart';

function MyTabBar({state, descriptors, navigation}) {
  //bring in the CartContext so that we can display the figure in the badge
  const {cart} = useContext(CartContext);

  return (
    <View style={{width: '100%', position: 'relative'}}>
      <View
        style={{
          position: 'absolute',
          width: '80%',
          left: RFValue(35),
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: Colors.white,
          bottom: RFValue(20),
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Fragment key={index}>
              <View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  accessibilityRole="button"
                  accessibilityStates={isFocused ? ['selected'] : []}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}>
                  <View>
                    {index === 1 && (
                      <View
                        style={{
                          backgroundColor: Colors.primaryColor,
                          position: 'absolute',
                          right: -10,
                          top: -10,
                          padding: 5,
                          width: 25,
                          borderRadius: 50,
                          zIndex: 1,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{color: Colors.white, fontSize: RFValue(12)}}>
                          {cart.length}
                        </Text>
                      </View>
                    )}
                    <options.tabBarIcon
                      color={isFocused ? Colors.primaryColor : '#6e6e6e'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}

const MainNav = props => {
  return (
    <Fragment>
      <Tabs.Navigator
        initialRouteName={'Home'}
        tabBar={props => <MyTabBar {...props} />}
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: Colors.white,
          },
        }}>
        <Tabs.Screen
          component={HomeStack}
          name={'HomeRoot'}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color}) => {
              return <Feather name={'home'} color={color} size={RFValue(25)} />;
            },
          }}
        />
        <Tabs.Screen
          component={CartStack}
          name={'Cart'}
          options={{
            tabBarLabel: 'Cart',

            tabBarIcon: ({focused, color}) => {
              return (
                <Feather
                  name={'shopping-cart'}
                  color={color}
                  size={RFValue(25)}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          component={ProfileStack}
          name={'Profile'}
          options={{
            tabBarLabel: 'Profile',

            tabBarIcon: ({focused, color}) => {
              return <Feather name={'user'} color={color} size={RFValue(25)} />;
            },
          }}
        />
        <Tabs.Screen
          component={SettingseStack}
          name={'Settings'}
          options={{
            tabBarLabel: 'Settings',

            tabBarIcon: ({focused, color}) => {
              return (
                <Feather name={'settings'} color={color} size={RFValue(25)} />
              );
            },
          }}
        />
      </Tabs.Navigator>
    </Fragment>
  );
};
export default memo(MainNav);
