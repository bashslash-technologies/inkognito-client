import React, {Fragment} from 'react';
import {View, ImageBackground, StatusBar, SafeAreaView} from 'react-native';
import Text from '../../components/text';
import background from '../../assets/images/back.jpg';
import Colors from '../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import packageJson from '../../../package';
import Button from '../../components/button';

const WelcomeComponent = ({navigation}) => {
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground source={background} style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1}}>
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'space-around',
              marginHorizontal: RFValue(30),
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff'}}>Logo here</Text>
            <Text
              style={{
                color: Colors.white,
                textAlign: 'center',
                fontSize: RFValue(15),
              }}>
              Inkognito is a mobile and web based applciation that helps
              customers anonymously purchase items online and get them delivered
              at their doorsteps
            </Text>
            <View style={{width: '100%'}}>
              <Button
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 15,
                }}
                onPress={() => navigation.push('loginRoot')}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: RFValue(10),
                    justifyContent: 'center',
                  }}>
                  <Text
                    type={'semi-bold'}
                    style={{
                      color: Colors.primaryColor,
                      fontSize: RFValue(15),
                    }}>
                    Sign In
                  </Text>
                </View>
              </Button>
              <Button
                style={{
                  borderWidth: 1,
                  borderColor: Colors.white,
                  borderRadius: 15,
                  marginTop: RFValue(10),
                }}
                onPress={() => navigation.push('registerRoot')}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: RFValue(10),
                    justifyContent: 'center',
                  }}>
                  <Text
                    type={'semi-bold'}
                    style={{
                      color: Colors.white,
                      fontSize: RFValue(15),
                    }}>
                    Sign Up
                  </Text>
                </View>
              </Button>
              <Text
                style={{
                  color: Colors.white,
                  textAlign: 'center',
                  marginTop: RFValue(10),
                }}>
                Version {packageJson.version}
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </Fragment>
  );
};

export default WelcomeComponent;
