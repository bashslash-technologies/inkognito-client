import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Text from '../../components/text';
import Button from '../../components/button';
import Colors from '../../constants/colors';
import React from 'react';

const EmptyCart = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: RFValue(20),
      }}>
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
