import React, {Fragment, useState, useEffect} from 'react';
import {View, Image, ScrollView, TouchableOpacity, Modal} from 'react-native';
import Text from '../../components/text';
import Colors from '../../constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import SingleProduct from './singleProduct';
import HeaderComponent from './header';
import CategoryComponent from './category';
import styled from 'styled-components/native';
import SearchModalComponent from './modal';
import {get} from '../../services/transport';
import {showMessage} from 'react-native-flash-message';

const HomeComponent = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    get('/products/all')
      .then(res => {
        console.log(res.data.payload[0]);
        setData(res.data.payload);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        showMessage({
          message: 'Error',
          description: 'Oops, Something Happened',
          type: 'danger',
        });
      });
  }, []);
  return (
    <Fragment>
      <View style={{backgroundColor: Colors.white, flex: 1}}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setShow(true)}>
          <SearchContainer>
            <Text>Search</Text>
            <Feather name={'search'} color={Colors.primaryColor} size={20} />
          </SearchContainer>
        </TouchableOpacity>

        <ScrollView>
          <HeaderComponent icon={'grid'} title={'Categories'} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{paddingHorizontal: RFValue(10)}}>
            <CategoryComponent name={'Appliances'} icon={'activity'} />
            <CategoryComponent name={'Fashion'} icon={'archive'} />
            <CategoryComponent name={'Drugs'} icon={'coffee'} />
            <CategoryComponent name={'Accessories'} icon={'airplay'} />
          </ScrollView>
          {/*<HeaderComponent icon={'home'} title={'Shops'} />*/}
          {/*<ScrollView*/}
          {/*  horizontal*/}
          {/*  showsHorizontalScrollIndicator={false}*/}
          {/*  style={{paddingHorizontal: RFValue(10)}}>*/}
          {/*  <ShopComponent />*/}
          {/*  <ShopComponent />*/}
          {/*  <ShopComponent />*/}
          {/*  <ShopComponent />*/}
          {/*</ScrollView>*/}
          <HeaderComponent icon={'gift'} title={'Products'} />
          {data.map((product, key) => (
            <SingleProduct
              key={key}
              product={product}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
      <Modal visible={show} animationType={'fade'}>
        <Fragment>
          <SearchModalComponent setShow={setShow} />
        </Fragment>
      </Modal>
    </Fragment>
  );
};

const SearchContainer = styled(View)`
  margin: 10px;
  background-color: #ebf2fa;
  height: 40px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default HomeComponent;
