import React, {Fragment, useContext} from 'react';
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Colors from '../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Text from '../../components/text';
import Feather from 'react-native-vector-icons/Feather';
import {CartContext} from '../../context/cart';
import Button from '../../components/button';
const {width, height} = Dimensions.get('window');

const ViewProduct = ({
  navigation,
  route: {
    params: {product},
  },
}) => {
  console.log(product);
  const {cart, addItemToCart, removeItemFromCart} = useContext(CartContext);
  return (
    <Fragment>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <ScrollView style={{paddingHorizontal: 20}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: product?.images[0]}}
              resizeMode={'contain'}
              style={{
                width: '100%',
                height: RFValue(height / 5),
                borderRadius: 20,
              }}
            />
          </View>
          <View style={styles.body}>
            <ScrollView horizontal>
              {product?.images.map((img, i) => (
                <Fragment key={i}>
                  <Image
                    source={{uri: img}}
                    style={{
                      width: RFValue(60),
                      height: RFValue(60),
                      borderRadius: 20,
                      marginRight: 10,
                    }}
                  />
                </Fragment>
              ))}
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: RFValue(10),
              }}>
              <View>
                <Text type={'semi-bold'}>Name: {product?.name}</Text>
                <Text type={'semi-bold'}>Stock: {product?.stock} items</Text>
              </View>
              <View>
                <Text style={{color: Colors.primaryColor}}>
                  Gh&cent; {product?.price}
                </Text>
                <Text style={{textDecorationLine: 'line-through'}}>
                  Gh&cent; {parseFloat(product?.price) + 20}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text type={'bold'}>Vendor:</Text>
                <Text>{product?.vendor?.business_name}</Text>
              </View>

              <View style={{justifyContent: 'center'}}>
                {cart.find(el => el._id === product._id) && (
                  <ValueCounter product={product._id} />
                )}
              </View>
            </View>
            <View>
              {!cart.find(el => el._id === product._id) ? (
                <Button
                  style={{
                    backgroundColor: Colors.primaryColor,
                    borderRadius: 15,
                    width: '100%',
                    marginTop: 10,
                  }}
                  onPress={() => addItemToCart(product)}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 10,
                    }}>
                    <Feather
                      name={'shopping-cart'}
                      size={20}
                      color={Colors.white}
                    />
                    <Text
                      type={'semi-bold'}
                      style={{
                        color: Colors.white,
                        fontSize: RFValue(15),
                        marginLeft: 10,
                      }}>
                      Add To Cart
                    </Text>
                  </View>
                </Button>
              ) : (
                <Button
                  style={{
                    backgroundColor: Colors.primaryColor,
                    borderRadius: 15,
                    width: '100%',
                    marginTop: 10,
                  }}
                  onPress={() => removeItemFromCart(product._id)}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 10,
                    }}>
                    <Feather
                      name={'shopping-cart'}
                      size={20}
                      color={Colors.white}
                    />
                    <Text
                      type={'semi-bold'}
                      style={{
                        color: Colors.white,
                        fontSize: RFValue(15),
                        marginLeft: 10,
                      }}>
                      Remove from cart
                    </Text>
                  </View>
                </Button>
              )}
            </View>
            <View style={{marginTop: 20}}>
              <Text type={'bold'}>Description</Text>
              <Text>{product?.description}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};

const ValueCounter = ({product}) => {
  const {cart, increaseQty, decreaseQty} = useContext(CartContext);
  return (
    <Fragment>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableHighlight
          nderlayColor={Colors.primaryBackground}
          onPress={() => decreaseQty(product)}
          style={{
            marginRight: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.primaryColor,
            padding: 5,
          }}>
          <Feather name={'minus'} color={Colors.primaryColor} size={20} />
        </TouchableHighlight>
        <View style={{marginRight: 10}}>
          <Text>{cart.find(item => item._id === product)?.qty}</Text>
        </View>
        <TouchableHighlight
          underlayColor={Colors.primaryBackground}
          onPress={() => increaseQty(product)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.primaryColor,
            padding: 5,
          }}>
          <Feather name={'plus'} color={Colors.primaryColor} size={20} />
        </TouchableHighlight>
      </View>
    </Fragment>
  );
};

ViewProduct.navigationOptions = {
  title: 'Hello',
};

export default ViewProduct;

const styles = StyleSheet.create({
  body: {},
});
