import React, {Fragment, useRef, useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  Keyboard,
  Platform,
  Animated,
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
import Feather from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import background from '../../assets/images/back2.jpg';
import {validate} from '../../services/utils';
import {get, post} from '../../services/transport';
import {showMessage} from 'react-native-flash-message';
import {AuthContext} from '../../navigation/appNavigator';

const LoginComponent = ({navigation}) => {
  const [signInView] = useState(new Animated.Value(1));
  const [forgotView] = useState(new Animated.Value(0));
  const [showView, setShowView] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [{signIn}] = useContext(AuthContext);

  const [forgot, setForgot] = useState('');
  const [loadForgot, setLoadForgot] = useState(false);

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

  const sendForgot = async () => {
    if (!validate(forgot.trim(), 'Email Address is invalid', 'email')) return;
    try {
      setLoadForgot(true);
      let results = await get(`/users/reset?username=${forgot.trim()}`);
      results = results.data;
      if (!results.success) {
        setLoadForgot(false);
        showMessage({
          message: 'Error',
          description: results.message,
          type: 'danger',
        });
        return;
      }
      navigation.push('verifyForgot', {
        id: results.payload.id,
        email: results.payload.email,
        contact: `+${results.payload.contact}`,
      });
      setLoadForgot(false);
      setForgot('');
      return;
    } catch (e) {
      console.log(e);
      setLoadForgot(false);
    }
  };

  const handleSubmit = async () => {
    if (!validate(email.trim(), 'Email Address is invalid', 'email')) return;
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
      let results = await post('/users/login', {
        username: email.trim(),
        password: password.trim(),
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
      if (results.payload.user.util) {
        setLoading(false);
        return navigation.navigate('registerRoot', {
          screen: 'verifyRegister',
          params: {
            id: results.payload.user.id,
            email: results.payload.user.email,
            contact: `+${results.payload.user.contact}`,
          },
        });
      }

      await signIn(results.payload);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const showForgotPasswordView = () => {
    Animated.parallel([
      Animated.spring(signInView, {
        toValue: 0,
        friction: 10,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.spring(forgotView, {
        toValue: 1,
        friction: 10,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const showSignInView = () => {
    Animated.parallel([
      Animated.spring(signInView, {
        toValue: 1,
        friction: 10,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.spring(forgotView, {
        toValue: 0,
        friction: 10,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const passwordRef = useRef();
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
        <SafeAreaView>
          <AuthHeader
            goBack={() => navigation.pop()}
            anotherPageTitle={'Sign Up'}
            anotherPagePress={() =>
              navigation.navigate('registerRoot', {screen: 'navigate'})
            }
          />
        </SafeAreaView>
        <View style={{height: height / 4}} />
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
            }}>
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                opacity: signInView,
                transform: [
                  {
                    scale: signInView,
                  },
                ],
              }}>
              <Text
                style={{
                  fontSize: RFValue(40),
                  textAlign: 'center',
                  marginBottom: RFValue(50),
                }}>
                Sign in
              </Text>
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
              <View style={{marginBottom: RFValue(30)}}>
                <TextInput
                  title={'Password'}
                  returnKeyType={'done'}
                  placeholder={'Password here'}
                  secureTextEntry
                  icon={'lock'}
                  value={password}
                  onChangeText={e => setPassword(e)}
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
                      Sign in
                    </Text>
                  )}
                </View>
              </Button>
              <TouchableOpacity
                onPress={showForgotPasswordView}
                style={{justifyContent: 'center', marginTop: RFValue(10)}}>
                <Text style={{textAlign: 'center'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={{
                opacity: forgotView,
                transform: [
                  {
                    scale: forgotView,
                  },
                ],
              }}>
              <Text
                style={{
                  fontSize: RFValue(30),
                  textAlign: 'center',
                  marginBottom: RFValue(10),
                }}>
                Forgot Password
              </Text>
              <Text
                style={{
                  fontSize: RFValue(13),
                  textAlign: 'center',
                  marginBottom: RFValue(50),
                }}>
                Enter your email and will sent you a 5 digit code to reset your
                password
              </Text>
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
                  value={forgot}
                  onChangeText={e => setForgot(e)}
                  style={{color: Colors.primaryColor}}
                />
              </View>

              <Button
                disbled={loadForgot}
                style={{
                  backgroundColor: Colors.primaryColor,
                  borderRadius: 15,
                }}
                onPress={sendForgot}>
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
                      Send reset pin
                    </Text>
                  )}
                </View>
              </Button>

              <Button
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 15,
                  marginTop: 10,
                  borderWidth: 0.5,
                  borderColor: Colors.primaryColor,
                }}
                onPress={showSignInView}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: RFValue(10),
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.primaryColor,
                      borderRadius: 50,
                      marginRight: 10,
                    }}>
                    <Feather
                      name={'chevron-left'}
                      color={Colors.white}
                      size={20}
                    />
                  </View>
                  <Text
                    style={{
                      color: Colors.primaryColor,
                      fontSize: RFValue(15),
                    }}>
                    Back to Sign In
                  </Text>
                </View>
              </Button>
            </Animated.View>
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

export default LoginComponent;
