import React, {Fragment} from 'react';
import {View, ScrollView} from 'react-native';
import Text from '../../components/text';
import Colors from '../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import EmptyCart from './emptyCart';
import Feather from 'react-native-vector-icons/Feather';
import SingleCart from './singleCart';

const CartComponent = ({navigation}) => {
  return (
    <Fragment>
      <View style={{backgroundColor: Colors.white, flex: 1}}>
        {/*<EmptyCart navigation={navigation} for empty cart />*/}
        <View
          style={{
            flexDirection: 'row',
            padding: RFValue(10),
            marginBottom: RFValue(5),
            alignItems: 'center',
          }}>
          <View style={{flex: 1.5}}>
            <View
              style={{
                backgroundColor: Colors.primaryBackground,
                justifyContent: 'center',
                alignItems: 'center',

                width: RFValue(40),
                height: RFValue(35),
                borderRadius: 10,
              }}>
              <Feather
                name={'shopping-cart'}
                size={25}
                color={Colors.primaryColor}
              />
            </View>
          </View>
          <View style={{flex: 6}}>
            <Text type={'medium'} style={{fontSize: RFValue(15)}}>
              In your cart
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text>6</Text>
          </View>
        </View>
        <ScrollView>
          <SingleCart />
          <SingleCart />
          <SingleCart />
          <SingleCart />
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default CartComponent;
