import React, {Fragment} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from './text';
import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/colors';
import PropTypes from 'prop-types';

const AuthHeader = ({anotherPagePress, anotherPageTitle, goBack}) => {
  return (
    <Fragment>
      <StyledHeaderContainer>
        <StyledBackContainer
          activeOpacity={0.7}
          onPress={goBack}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
          }}>
          <Feather name={'chevron-left'} size={RFValue(27)} />
        </StyledBackContainer>
        <TouchableOpacity activeOpacity={0.7} onPress={anotherPagePress}>
          <Text
            type={'semi-bold'}
            style={{fontSize: RFValue(14), color: '#fff'}}>
            {anotherPageTitle}
          </Text>
        </TouchableOpacity>
      </StyledHeaderContainer>
    </Fragment>
  );
};

AuthHeader.propTypes = {
  anotherPagePress: PropTypes.func,
  anotherPageTitle: PropTypes.string,
  goBack: PropTypes.func,
};

const StyledHeaderContainer = styled(View)`
  margin-horizontal: ${RFValue(30)}px;
  margin-top: ${RFValue(10)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledBackContainer = styled(TouchableOpacity)`
  background-color: ${Colors.white};
  padding-horizontal: ${RFValue(5)}px;
  padding-vertical: ${RFValue(3)}px;
  border-radius: 10px;
`;

export default AuthHeader;
