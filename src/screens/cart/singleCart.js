import React, {Fragment, useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Text from '../../components/text';
import cart, {CartContext} from '../../context/cart';

const SingleCart = ({cartItem, showRemove}) => {
  const {removeItemFromCart} = useContext(CartContext);
  return (
    <Fragment>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: RFValue(10),
          paddingHorizontal: RFValue(10),
          paddingBottom: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: '#f1f1f1',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: Colors.primaryBackground,
              justifyContent: 'center',
              alignItems: 'center',

              width: RFValue(50),
              height: RFValue(50),
              borderRadius: 10,
            }}>
            <Feather
              name={'shopping-cart'}
              size={25}
              color={Colors.primaryColor}
            />
          </View>
        </View>
        <View style={{flex: 4, justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <Text
              type={'semi-bold'}
              style={{flexWrap: 'wrap', width: RFValue(170)}}>
              {cartItem?.name}
            </Text>
            <Text>GHç {cartItem?.price}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>by {cartItem?.vendor.business_name}</Text>
            {!showRemove ? (
              <TouchableOpacity
                onPress={() => removeItemFromCart(cartItem._id)}
                style={{
                  backgroundColor: Colors.danger,
                  borderWidth: 0.5,
                  borderColor: Colors.danger,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 3,
                }}>
                <Feather name={'x-circle'} size={25} color={Colors.white} />
                <Text style={{color: '#fff', marginLeft: 5}}>Remove</Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 20 / 2,
                  backgroundColor: Colors.primaryColor,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>{cartItem.qty}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Fragment>
  );
};

export default SingleCart;
