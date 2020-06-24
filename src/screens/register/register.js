/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
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
import AuthHeader from '../../components/header';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import Button from '../../components/button';
import TextInput from '../../components/textInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validate} from '../../services/utils';
import {post} from '../../services/transport';
import {showMessage} from 'react-native-flash-message';

const RegisterComponent = ({navigation}) => {
  const [showView, setShowView] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
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

  const passwordRef = useRef();
  const {height} = useWindowDimensions();
  const handleSubmit = async () => {
    if (!validate(name.trim(), 'Name is required')) return;
    if (!validate(email.trim(), 'Email Address is invalid', 'email')) return;
    if (!validate(contact.trim(), 'Phone Number is invalid', 'contact')) return;
    if (
      !validate(
        password.trim(),
        'Password should be more than 6 characters',
        'password',
      )
    )
      return;

    try {
      setLoading(true);
      let results = await post('/users/create', {
        name: name.trim(),
        email: email.trim(),
        contact: contact.trim().slice(-9),
        password: password.trim(),
        role: 'USER',
      });
      results = results.data;
      console.log(results);

      if (!results.success) {
        setLoading(false);
        showMessage({
          message: 'Error',
          description: results.message,
          type: 'danger',
        });
        return;
      }
      navigation.push('verifyRegister', {
        id: results.payload.user.id,
        email: results.payload.user.email,
        contact: `+${results.payload.user.contact}`,
      });
      setLoading(false);
      setName('');
      setEmail('');
      setContact('');
      setPassword('');
      return;
    } catch (e) {
      console.log(e);
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
        <SafeAreaView>
          <AuthHeader
            goBack={() => navigation.pop()}
            anotherPageTitle={'Sign In'}
            anotherPagePress={() =>
              navigation.navigate('loginRoot', {screen: 'navigate'})
            }
          />
        </SafeAreaView>
        <View style={{height: height / 6}} />
        <StyledBottomContainer
          scrollEnabled={true}
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
            }}>
            <Text
              style={{
                fontSize: RFValue(40),
                textAlign: 'center',
                marginBottom: RFValue(50),
              }}>
              Sign up
            </Text>
            <View
              style={{
                marginBottom: RFValue(Platform.OS === 'android' ? 30 : 20),
              }}>
              <TextInput
                placeholder={'Full name here'}
                title={'Full Name'}
                icon={'user'}
                returnKeyType={'next'}
                value={name}
                onChangeText={e => setName(e)}
                style={{color: Colors.primaryColor}}
              />
            </View>
            {Platform.OS === 'android' && showView && (
              <View style={{height: RFValue(40)}} />
            )}
            <View
              style={{
                marginBottom: RFValue(Platform.OS === 'android' ? 30 : 20),
              }}>
              <TextInput
                placeholder={'Email here'}
                title={'Email Address'}
                icon={'mail'}
                returnKeyType={'next'}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize={'none'}
                value={email}
                onChangeText={e => setEmail(e)}
                style={{color: Colors.primaryColor}}
              />
            </View>
            {Platform.OS === 'android' && showView && (
              <View style={{height: RFValue(40)}} />
            )}
            <View
              style={{
                marginBottom: RFValue(Platform.OS === 'android' ? 30 : 20),
              }}>
              <TextInput
                placeholder={'Contact here'}
                title={'Phone Number'}
                icon={'phone'}
                returnKeyType={'next'}
                keyboardType="numbers-and-punctuation"
                value={contact}
                onChangeText={e => setContact(e)}
                style={{color: Colors.primaryColor}}
              />
            </View>
            {Platform.OS === 'android' && showView && (
              <View style={{height: RFValue(40)}} />
            )}
            <View style={{marginBottom: RFValue(30)}}>
              <TextInput
                title={'Password'}
                ref={passwordRef}
                returnKeyType={'done'}
                placeholder={'Password here'}
                secureTextEntry
                icon={'lock'}
                value={password}
                onChangeText={e => setPassword(e)}
              />
            </View>
            <Button
              disabled={loading}
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
                    Create an account
                  </Text>
                )}
              </View>
            </Button>
            <View
              style={{
                marginHorizontal: RFValue(10),
                marginTop: RFValue(10),
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>
                By signing up, you agree to our
              </Text>
              <TouchableOpacity>
                <Text style={{color: Colors.primaryColor}}> Terms</Text>
              </TouchableOpacity>
              <Text> and </Text>
              <TouchableOpacity>
                <Text style={{color: Colors.primaryColor}}>
                  Conditions Of Use
                </Text>
              </TouchableOpacity>
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

export default RegisterComponent;
