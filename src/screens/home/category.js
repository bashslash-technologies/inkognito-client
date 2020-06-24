import React, {Fragment} from 'react';
import {View} from 'react-native';
import Text from '../../components/text';
import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';

const CategoryComponent = ({name, icon}) => {
  return (
    <Fragment>
      <Container>
        <Feather name={icon} size={20} color={Colors.primaryColor} />
        <Text style={{marginLeft: 10}}>{name}</Text>
      </Container>
    </Fragment>
  );
};

const Container = styled(View)`
  margin-right: 10px;
  padding: 10px;
  width: ${RFValue(150)}px;
  height: ${RFValue(50)}px;
  background-color: ${Colors.primaryBackground};
  border-radius: 10px;
  align-items: center;
  flex-direction: row;
`;

export default CategoryComponent;
