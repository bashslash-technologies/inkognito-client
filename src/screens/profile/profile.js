import React, {Fragment, useContext} from 'react';
import {View, Dimensions, Image, ScrollView} from 'react-native';
import Text from '../../components/text';
import Colors from '../../constants/colors';
import defaultImg from '../../assets/images/default.jpeg';
import {RFValue} from 'react-native-responsive-fontsize';
import CardItem from './CardItem';
import moment from 'moment';
import {AuthContext} from '../../navigation/appNavigator';

const {height} = Dimensions.get('window');

const ProfileComponent = props => {
  const [{}, data] = useContext(AuthContext);
  console.log(data);
  return (
    <Fragment>
      <View style={{flex: 1, backgroundColor: Colors.primaryBackground}}>
        <View
          style={{
            height: height / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={defaultImg}
            style={{
              height: RFValue(100),
              width: RFValue(100),
              borderRadius: 100,
            }}
          />
          <View style={{marginTop: RFValue(10)}}>
            <Text style={{fontSize: RFValue(20)}}>
              {data?.userToken?.user?.name}
            </Text>
            <Text style={{fontSize: RFValue(12), textAlign: 'center'}}>
              JOINED {moment(data?.userToken?.user?.createdAt).format('MMMM')}
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <CardItem title={'Notifications '} icon={'bell'} />
          <CardItem title={'My Orders '} icon={'loader'} />
          <CardItem title={'Addresses '} icon={'map-pin'} />
          <CardItem title={'Payment '} icon={'credit-card'} />
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default ProfileComponent;
