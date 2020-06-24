import React, {Fragment, useRef, useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  Keyboard,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Text from '../../components/text';
import Colors from '../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import Button from '../../components/button';
import TextInput from '../../components/textInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validate} from '../../services/utils';
import {get, post} from '../../services/transport';
import {showMessage} from 'react-native-flash-message';

const VerifyForgotComponent = ({navigation, route}) => {
  const [showView, setShowView] = useState(false);
  const [code, setCode] = useState('');
  const [countDown, setCountdown] = useState(59);
  const [resendLoad, setResetLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (countDown > 0) setTimeout(() => setCountdown(countDown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countDown]);
  function _keyboardDidShow() {
    setShowView(true);
  }

  function _keyboardDidHide() {
    setShowView(false);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const HandleSubmit = async () => {
    if (code.trim() === '')
      return showMessage({
        message: 'Error',
        description: 'Verification code is invalid',
        type: 'danger',
      });
    try {
      setLoading(true);
      let results = await post(`/users/reset`, {
        username: route.params.email,
        code,
      });
      results = results.data;
      if (!results.success) {
        setLoading(false);
        showMessage({
          message: 'Error',
          description: results.message,
          type: 'danger',
        });
        return;
      }
      navigation.push('reset', {
        user_data: results.payload,
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setResetLoad(true);
      let results = await get(`/users/reset?username=${route.params.email}`);
      results = results.data;
      if (!results.success) {
        setLoading(false);
        showMessage({
          message: 'Error',
          description: results.message,
          type: 'danger',
        });
        return;
      }
      setResetLoad(false);
      if (countDown == 0) setCountdown(59);
    } catch (e) {
      setResetLoad(false);
      setCountdown(0);
    }
  };

  const {height} = useWindowDimensions();
  return (
    <Fragment>
      <StatusBar
        backgroundColor={Colors.primaryBackground}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../../assets/images/back2.jpg')}
        style={{flex: 1, backgroundColor: Colors.primaryBackground}}>
        <View style={{height: height / 3}} />
        <StyledBottomContainer
          scrollEnabled={true}
          resetScrollToCoords={{x: 0, y: 0}}
          // enableOnAndroid={true}
          // keyboardShouldPersistTaps="handled"
          // enableAutomaticScroll={true}
          // extraScrollHeight={10}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
          }}>
          <View
            style={{
              width: '100%',
              marginTop: RFValue(10),
            }}>
            <Text
              style={{
                fontSize: RFValue(30),
                textAlign: 'center',
                marginBottom: RFValue(10),
              }}>
              Verification Code
            </Text>
            <Text
              style={{
                fontSize: RFValue(13),
                textAlign: 'center',
                marginBottom: RFValue(50),
              }}>
              Please the verification code send we sent to your phone number (
              {route.params.contact})
            </Text>
            <View
              style={{
                marginBottom: RFValue(Platform.OS === 'android' ? 30 : 20),
              }}>
              <TextInput
                placeholder={'Verification Code here'}
                title={'Verification Code'}
                icon={'lock'}
                returnKeyType={'next'}
                style={{color: Colors.primaryColor}}
                value={code}
                onChangeText={text => setCode(text)}
              />
            </View>

            <Button
              style={{
                backgroundColor: Colors.primaryColor,
                borderRadius: 15,
              }}
              onPress={HandleSubmit}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: RFValue(10),
                  justifyContent: 'center',
                }}>
                {loading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : (
                  <Text
                    type={'semi-bold'}
                    style={{
                      color: Colors.white,
                      fontSize: RFValue(15),
                    }}>
                    Done
                  </Text>
                )}
              </View>
            </Button>
            <View
              onPress={() => alert('hello')}
              style={{
                justifyContent: 'center',
                marginTop: RFValue(10),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>Didn't receive code?</Text>
              {resendLoad ? (
                <Text style={{color: Colors.primaryColor}}> Loading...</Text>
              ) : countDown !== 0 ? (
                <Text style={{color: Colors.primaryColor}}>
                  {' '}
                  0:{countDown < 10 ? `0${countDown}` : countDown}
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendVerification}>
                  <Text style={{color: Colors.primaryColor}}> resend</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </StyledBottomContainer>
      </ImageBackground>
    </Fragment>
  );
};
const StyledBottomContainer = styled(KeyboardAwareScrollView)`
  background-color: ${Colors.white};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding: ${RFValue(20)}px;
`;

const LoginStyledContainer = styled(View)`
  border-radius: ${RFValue(100)}px;
  padding-horizontal: ${RFValue(37)}px;
  padding-vertical: ${RFValue(33)}px;
  background-color: ${Colors.white};
  position: absolute;
  top: ${RFValue(-40)}px;
`;

export default VerifyForgotComponent;
