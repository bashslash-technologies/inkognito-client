import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const LoadingComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={50} />
      <Text type={'header'} style={{fontSize: RFValue(20)}}>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingComponent;
