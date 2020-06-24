import React, {Fragment} from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Text from '../../components/text';

const ShopComponent = ({}) => {
  return (
    <Fragment>
      <View style={{marginRight: RFValue(10), width: RFValue(100)}}>
        <View
          style={{
            backgroundColor: Colors.primaryBackground,
            justifyContent: 'center',
            alignItems: 'center',
            height: RFValue(50),
            borderRadius: 10,
          }}>
          <Feather name={'home'} color={Colors.primaryColor} size={30} />
        </View>
        <Text style={{textAlign: 'center', marginTop: RFValue(3)}}>
          Hello World
        </Text>
      </View>
    </Fragment>
  );
};

export default ShopComponent;
