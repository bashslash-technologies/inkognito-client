import React, {Fragment} from 'react';
import {Image, View} from 'react-native';
import Colors from '../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Text from '../../components/text';
import Feather from 'react-native-vector-icons/Feather';

const SingleProduct = ({}) => {
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
            source={require('../../assets/images/shoe.jpg')}
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
            <Text>Nike presto</Text>
            <Text>GHç 180</Text>
          </View>
          <View
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
            <Text style={{color: Colors.primaryColor, marginLeft: 5}}>Add to cart</Text>
          </View>
        </View>
      </View>
    </Fragment>
  );
};
export default SingleProduct;
