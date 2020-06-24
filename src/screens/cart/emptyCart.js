/* eslint-disable react-native/no-inline-styles */
import {View, Dimensions, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Text from '../../components/text';
import Button from '../../components/button';
import Colors from '../../constants/colors';
import React from 'react';

const {height} = Dimensions.get('screen');

const EmptyCart = ({navigation}) => {
  return (
    <View
      style={{
        height,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: RFValue(20),
      }}>
      <Image
        source={require('../../assets/images/empty.png')}
        style={{width: 200, height: 200}}
      />
      <Text
        type={'light'}
        style={{fontSize: RFValue(20), marginBottom: RFValue(5)}}>
        Cart is empty !
      </Text>
      <View style={{marginBottom: RFValue(20)}}>
        <Text>Let's find something special for you</Text>
      </View>
      <Button
        style={{
          backgroundColor: Colors.primaryColor,
          borderRadius: 15,
          width: '100%',
        }}
        onPress={() => navigation.navigate('Home')}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            type={'semi-bold'}
            style={{
              color: Colors.white,
              fontSize: RFValue(15),
            }}>
            Start Shopping
          </Text>
        </View>
      </Button>
    </View>
  );
};
export default EmptyCart;
