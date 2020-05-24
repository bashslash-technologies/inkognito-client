import React, {Fragment} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Text from '../../components/text';
import {useHeaderHeight} from '@react-navigation/stack';
import styled from 'styled-components/native';
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import SingleProduct from './singleProduct';

const SearchModalComponent = ({setShow}) => {
  const height = useHeaderHeight();
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} />
      <HeaderComponent style={{height: height + RFValue(10)}}>
        <View style={{flex: 2}}>
          <TextInputStyle placeholder={'Search here eg. Iphone X'} />
        </View>
        <View style={{flex: 0.1}} />
        <TouchableOpacity
          style={{flex: 0.2, marginBottom: 5}}
          onPress={() => setShow(false)}>
          <Feather name={'x'} color={Colors.primaryColor} size={25} />
        </TouchableOpacity>
      </HeaderComponent>
      <ScrollView style={{paddingTop: RFValue(10)}}>
        <SingleProduct />
        <SingleProduct />
        <SingleProduct />
        <SingleProduct />
      </ScrollView>
    </Fragment>
  );
};

const HeaderComponent = styled(View)`
  border-bottom-width: 0.5px;
  border-color: ${Colors.primaryColor};
  flex-direction: row;
  padding-bottom: 10px;
  padding-horizontal: 15px;
  align-items: flex-end;
`;

const TextInputStyle = styled(TextInput)`
  background-color: #ebf2fa;
  height: 40px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export default SearchModalComponent;
