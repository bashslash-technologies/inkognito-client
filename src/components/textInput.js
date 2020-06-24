/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, Fragment} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import Text from './text';
import styled from 'styled-components';
import Colors from '../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';

const TextInputComponent = forwardRef((props, ref) => {
  return (
    <Fragment>
      <ContainerStyled>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.primaryBackground,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            borderRadius: 10,
          }}>
          <Feather name={props.icon} size={25} color={Colors.primaryColor} />
        </View>
        <View style={{flex: 0.2}} />
        <View
          style={{flex: 5, height: '100%', justifyContent: 'space-between'}}>
          <Text type={'semi-bold'} style={{fontSize: RFValue(10)}}>
            {props.title}
          </Text>

          <TextInput {...props} ref={ref} style={[props.style, styles.root]} />
        </View>
      </ContainerStyled>
    </Fragment>
  );
});

TextInputComponent.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const ContainerStyled = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: ${RFValue(43)}px;
`;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    paddingBottom: 10,
  },
});

export default TextInputComponent;
