import React, {Fragment} from 'react';
import {TouchableHighlight, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Text from '../../components/text';

const CardItem = ({title, icon}) => {
  return (
    <Fragment>
      <TouchableHighlight
        underlayColor={'#fafafa'}
        onPress={() => alert('hello')}>
        <View
          style={{
            flexDirection: 'row',
            padding: RFValue(10),
            height: RFValue(60),
            marginBottom: RFValue(5),
            alignItems: 'center',
          }}>
          <View style={{flex: 1.5}}>
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.primaryBackground,
                justifyContent: 'center',
                alignItems: 'center',
                height: RFValue(20),

                width: RFValue(40),
                borderRadius: 10,
              }}>
              <Feather name={icon} size={25} color={Colors.primaryColor} />
            </View>
          </View>
          <View style={{flex: 6}}>
            <Text type={'medium'} style={{fontSize: RFValue(15)}}>
              {title}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.white,
                borderWidth: 0.5,
                borderColor: Colors.primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                width: RFValue(35),
                borderRadius: 10,
              }}>
              <Feather
                name={'chevron-right'}
                size={25}
                color={Colors.primaryColor}
              />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </Fragment>
  );
};

export default CardItem;
