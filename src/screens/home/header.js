import {View, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Text from '../../components/text';
import React from 'react';

const HeaderComponent = ({icon, title, goTo}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: RFValue(10),
        height: RFValue(50),
        alignItems: 'center',
      }}>
      <View style={{flex: 1.2}}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.primaryBackground,
            justifyContent: 'center',
            alignItems: 'center',

            width: RFValue(30),
            borderRadius: 10,
          }}>
          <Feather name={icon} size={20} color={Colors.primaryColor} />
        </View>
      </View>
      <View style={{flex: 7}}>
        <Text type={'medium'} style={{fontSize: RFValue(13)}}>
          {title}
        </Text>
      </View>
      <TouchableOpacity onPress={goTo}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text>See all</Text>
          <Feather
            name={'chevron-right'}
            size={20}
            color={Colors.primaryColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
