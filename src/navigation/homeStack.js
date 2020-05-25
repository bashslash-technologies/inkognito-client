import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import HomeComponent from '../screens/home';
import ViewProduct from '../screens/home/ViewProduct';
import Colors from '../constants/colors';
import AllProductsComponent from '../screens/home/allProducts';

const HomeStack = props => {
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name={'Home'}
          options={{
            headerStyle: {backgroundColor: Colors.primaryColor},
            headerTitleStyle: {color: Colors.white},
          }}
          component={HomeComponent}
        />
        <Stack.Screen
          name={'AllProducts'}
          options={{
            title: 'Products',
            headerStyle: {backgroundColor: Colors.primaryColor},
            headerTitleStyle: {color: Colors.white},
            headerBackTitleStyle: {color: Colors.white},
          }}
          component={AllProductsComponent}
        />
        <Stack.Screen
          name="SingleProduct"
          options={({route}) => ({
            title: route.params?.product?.name,
            headerStyle: {backgroundColor: Colors.primaryColor},
            headerTitleStyle: {color: Colors.white},
            headerBackTitleStyle: {color: Colors.white},
          })}
          component={ViewProduct}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default React.memo(HomeStack);
