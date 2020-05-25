import React, {Fragment, useContext} from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Text from '../../components/text';
import Feather from 'react-native-vector-icons/Feather';
import {CartContext} from '../../context/cart';

const ViewProduct = ({navigation, product}) => {
  const {cart, addItemToCart, removeItemFromCart} = useContext(CartContext);
  return (
    <Fragment>
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
          padding: 5,
        }}>
        <View
          style={{
            backgroundColor: Colors.primaryBackground,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={{uri: product?.images[0]}}
            resizeMode={'contain'}
            style={{width: '80%', height: RFValue(150)}}
          />
        </View>
        <View
          style={{
            marginTop: RFValue(5),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>{product?.name}</Text>
            <Text>GHç {product?.price}</Text>
          </View>
          {!cart.find(el => el._id === product?._id) ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => addItemToCart(product)}
              style={{
                backgroundColor: Colors.white,
                borderWidth: 0.5,
                borderColor: Colors.primaryColor,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 3,
                paddingHorizontal: RFValue(30),
              }}>
              <Feather
                name={'plus-circle'}
                size={25}
                color={Colors.primaryColor}
              />
              <Text style={{color: Colors.primaryColor, marginLeft: 5}}>
                Add to cart
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => removeItemFromCart(product?._id)}
              style={{
                backgroundColor: Colors.white,
                borderWidth: 0.5,
                borderColor: Colors.primaryColor,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 3,
                paddingHorizontal: RFValue(30),
              }}>
              <Feather
                name={'x-circle'}
                size={25}
                color={Colors.primaryColor}
              />
              <Text style={{color: Colors.primaryColor, marginLeft: 5}}>
                Remove from cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Fragment>
  );
};

export default ViewProduct;

const styles = StyleSheet.create({});
