import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Animated, Easing, StatusBar} from 'react-native';
import Text from '../../components/text';
import Button from '../../components/button';
import Colors from '../../constants/colors';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../../navigation/appNavigator';

const SuccessPage = props => {
  let progress = new Animated.Value(0);
  let textProgress = new Animated.Value(0);
  let buttonProgress = new Animated.Value(0);
  const [{signIn}] = useContext(AuthContext);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.spring(textProgress, {
        toValue: 1,
        friction: 10,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.spring(buttonProgress, {
        toValue: 1,
        friction: 10,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = async () => {
    await signIn(props.route.params.user_data);
  };
  return (
    <View style={styles.root}>
      <StatusBar animated barStyle="light-content" />
      <LottieView
        source={require('../../assets/lottie/checkmark.json')}
        style={{width: 200, marginBottom: 20}}
        progress={progress}
      />
      <Animated.Text
        style={[
          styles.subText,
          {
            opacity: textProgress,
            transform: [
              {
                scale: textProgress,
              },
            ],
          },
        ]}
        subText={true}>
        Thanks for taking your time to create an account with us. Now this is
        the fun part, lets explore the app!
      </Animated.Text>
      <Animated.View
        style={{
          opacity: buttonProgress,
          transform: [
            {
              scale: buttonProgress,
            },
          ],
        }}>
        <Button
          underlayColor="#1c73ff"
          style={{
            backgroundColor: Colors.white,
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 5,
          }}
          onPress={handleSubmit}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 13,
            }}>
            <Text
              style={{
                color: Colors.primaryColor,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Continue
            </Text>
            <Ionicons
              type="arrow-forward"
              style={{color: Colors.white, fontSize: 20, marginLeft: 10}}
            />
          </View>
        </Button>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFValue(20),
  },
  subText: {
    marginBottom: RFValue(10),
    fontSize: RFValue(18),
    color: Colors.white,
    textAlign: 'center',
  },
});

export default SuccessPage;
