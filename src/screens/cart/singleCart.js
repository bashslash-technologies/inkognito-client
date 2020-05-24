import React, {Fragment} from 'react';
import {TouchableHighlight, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Text from '../../components/text';

const SingleCart = ({}) => {
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
              Oat Meal lorem svsiv sdyvsdiukbvsu
            </Text>
            <Text>GHç 180.0</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>by whatever tehnologies</Text>
            <View
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
            </View>
          </View>
        </View>
      </View>
    </Fragment>
  );
};

export default SingleCart;
