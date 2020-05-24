import React, {Fragment, useRef, useState} from 'react';
import {View, SafeAreaView, Image, StatusBar} from 'react-native';
import Text from '../../components/text';
import ViewPager from '@react-native-community/viewpager';
import styled from 'styled-components';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from '../../components/button';
import Colors from '../../constants/colors';
import setlocation from '../../assets/images/explore.png';
import deliveryService from '../../assets/images/push.png';
import payment from '../../assets/images/payment.png';
import confirmation from '../../assets/images/shop.png';
import Store from '../../services/index';

const Slider = props => {
  return (
    <React.Fragment>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          type={'light'}
          style={{textAlign: 'center', fontSize: RFValue(30)}}>
          {props.title}
        </Text>
        <Image
          source={props.image}
          resizeMode="contain"
          style={{height: RFValue(300), width: RFValue(300)}}
        />
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginHorizontal: RFValue(10),
          }}>
          <Text
            subText={true}
            style={{fontSize: RFValue(15), textAlign: 'center'}}>
            {props.description}
          </Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const OnBoardScreen = ({navigation}) => {
  const [page, setPage] = useState(0);
  const pager = useRef(null);
  const handleChangeInPage = e => {
    setPage(e.nativeEvent.position);
  };
  const handleGoBack = () => {
    if (page === 0) {
      return;
    }
    pager.current.setPage(page - 1);
  };

  const handleGoFront = props => {
    if (page === 3) return;
    pager.current.setPage(page + 1);
  };

  const handleContinueToStartScreen = async props => {
    try {
      await Store.storeToken('@onBoard', true);
      navigation.navigate('Auth');
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} />
      <BaseContainer>
        <StyledPager
          as={ViewPager}
          ref={pager}
          initialPage={page}
          onPageScroll={handleChangeInPage}
          showPageIndicator={false}
          scrollEnabled={true}>
          <StyledPageInner key="1">
            <Slider
              image={setlocation}
              title="Create An Account"
              description="Create an account and enjoy exclusive offers on products sold"
            />
          </StyledPageInner>
          <StyledPageInner key="2">
            <Slider
              image={confirmation}
              title="Shop Online"
              description="Shop for items online anonymously and get them delivered at your doorstep"
            />
          </StyledPageInner>
          <StyledPageInner key="3">
            <Slider
              image={payment}
              title="Payment"
              description="Customers can also pay online using only payment gateways"
            />
          </StyledPageInner>
          <StyledPageInner key="4">
            <Slider
              image={deliveryService}
              last
              title="Notification"
              description="As a customer, you'd be notified in real time for delivery updates"
            />
          </StyledPageInner>
        </StyledPager>
        <ButtonView>
          <View>
            <Button
              style={{
                backgroundColor: page === 0 ? '#a5bacf' : Colors.primaryColor,
                borderWidth: 1,
                borderColor: 'transparent',
                borderRadius: 15,
              }}
              disabled={page == 0 ? true : false}
              onPress={handleGoBack}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: RFValue(12),
                  paddingHorizontal: RFValue(30),
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: RFValue(16),
                    fontWeight: 'bold',
                  }}>
                  Previous
                </Text>
              </View>
            </Button>
          </View>
          <View>
            <Button
              style={{
                backgroundColor: Colors.primaryColor,
                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: 15,
              }}
              onPress={
                page === 3 ? handleContinueToStartScreen : handleGoFront
              }>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: RFValue(12),
                  paddingHorizontal: RFValue(40),
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: RFValue(16),
                    fontWeight: 'bold',
                  }}>
                  {page == 3 ? 'Start' : 'Next'}
                </Text>
              </View>
            </Button>
          </View>
        </ButtonView>
      </BaseContainer>
    </Fragment>
  );
};

const BaseContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

const StyledPager = styled(ViewPager)`
  flex: 1;
  margin-bottom: ${RFValue(20)}px;
`;

const StyledPageInner = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonView = styled(View)`
  opacity: 0.95;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: ${RFValue(20)}px;
  margin-bottom: ${RFValue(30)}px;
`;

export default OnBoardScreen;
