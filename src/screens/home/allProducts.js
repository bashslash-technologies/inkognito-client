import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  // TouchableOpacity,
  // Modal,
} from 'react-native';
// import Text from '../../components/text';
import Colors from '../../constants/colors';
// import {RFValue} from 'react-native-responsive-fontsize';
// import Feather from 'react-native-vector-icons/Feather';
import SingleProduct from './singleProduct';
// import HeaderComponent from './header';
// import CategoryComponent from './category';
// import styled from 'styled-components/native';
// import SearchModalComponent from './modal';
import {get} from '../../services/transport';
import {showMessage} from 'react-native-flash-message';

const AllProductsComponent = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(2);

  const fetchData = () => {
    get('/products/all')
      .then(res => {
        if (!res.data.success) {
          return showMessage({
            message: 'Error',
            description: res.data.message,
            type: 'danger',
          });
        }
        setData(res.data.payload);
        setLoading(false);
        setRefreshing(false);
        setLoadMore(false);
      })
      .catch(e => {
        setLoading(false);
        showMessage({
          message: 'Error',
          description: 'Oops, Something Happened',
          type: 'danger',
        });
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };
  // const loadMore = () => {
  //   setPage(parseInt(page) + 1);
  //   setLoadMore(true);
  //   fetchData();
  // };
  // const renderFooter = () => {
  //   if (!loadingMore) return null;

  //   return (
  //     <View
  //       style={{
  //         marginTop: 20,
  //       }}>
  //       <ActivityIndicator animating size={2} />
  //     </View>
  //   );
  // };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  return (
    <Fragment>
      <View style={{backgroundColor: Colors.white, flex: 1}}>
        {loading ? (
          <Fragment>
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <ActivityIndicator />
            </View>
          </Fragment>
        ) : (
          <Fragment>
            <FlatList
              data={data}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({item}) => {
                return (
                  <SingleProduct
                    key={item?._id}
                    product={item}
                    navigation={navigation}
                  />
                );
              }}
              keyExtractor={item => item?._id}
              // onEndReached={loadMore}
              // onEndReachedThreshold={0.5}
              // initialNumToRender={10}
              // ListFooterComponent={renderFooter}
            />
          </Fragment>
        )}
      </View>
    </Fragment>
  );
};

export default AllProductsComponent;
