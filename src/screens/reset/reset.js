import React, {Fragment, useRef, useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  Keyboard,
  Platform,
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
import {showMessage} from 'react-native-flash-message';
import {post} from '../../services/transport';

const ResetComponent = ({navigation, route}) => {
  const [showView, setShowView] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
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

  const {height} = useWindowDimensions();
  const handleSubmit = async () => {

      if (
      !validate(
        password.trim(),
        'Password should be more than 6 characters',
        'password',
      )
    )
      return;

    if (password.trim() !== confirm.trim()) {
      return showMessage({
        message: 'Error',
        description: 'Passwords do not match',
        type: 'danger',
      });
    }
    try {
      setLoading(true);
      let results = await post(
        `/users/password?user_id=${route.params.user_data.user._id}`,
        {
          password,
        },
      );
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
      navigation.popToTop();
      showMessage({
        message: 'Success',
        description: 'Password reset successfully',
        type: 'success',
      });
      setPassword('');
      setConfirm('');
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
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
              Reset Password
            </Text>
            <Text
              style={{
                fontSize: RFValue(13),
                textAlign: 'center',
                marginBottom: RFValue(50),
              }}>
              Please enter your new password
            </Text>
            <View
              style={{
                marginBottom: RFValue(Platform.OS === 'android' ? 30 : 20),
              }}>
              <TextInput
                placeholder={'Password here'}
                title={'New Password'}
                icon={'lock'}
                returnKeyType={'next'}
                secureTextEntry
                style={{color: Colors.primaryColor}}
                value={password}
                onChangeText={e => setPassword(e)}
              />
            </View>

            <View
              style={{
                marginBottom: RFValue(Platform.OS === 'android' ? 30 : 20),
              }}>
              <TextInput
                placeholder={'Password here'}
                title={'Confirm Password'}
                icon={'lock'}
                returnKeyType={'next'}
                style={{color: Colors.primaryColor}}
                secureTextEntry
                value={confirm}
                onChangeText={e => setConfirm(e)}
              />
            </View>

            <Button
              style={{
                backgroundColor: Colors.primaryColor,
                borderRadius: 15,
              }}
              onPress={handleSubmit}>
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
                    Reset
                  </Text>
                )}
              </View>
            </Button>
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

export default ResetComponent;
