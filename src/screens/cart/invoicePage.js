import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {CartContext} from '../../context/cart';
import SingleCart from './singleCart';
import colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import LocationView from 'react-native-location-view';

const deliveryOptions = [
  {
    id: 1,
    title: 'Free',
    price: '$0.00',
    description: ' 3 - 5 days delivery',
  },
  {
    id: 2,
    title: 'Standard',
    price: '$5.00',
    description: ' 2 - 3 days delivery',
  },
  {
    id: 3,
    title: 'Express',
    price: '$10.00',
    description: 'Next day delivery',
  },
];

const {height} = Dimensions.get('window');

const InvoicePage = () => {
  const {cart} = useContext(CartContext);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [showPickLocationModal, setShowPickLocationModal] = useState(false);
  const [deliveryChoices] = useState(deliveryOptions);
  const [delivery, setDelivery] = useState(null);
  const [location, setLocation] = useState(null);

  const handleLocationSelected = location => {
    console.log(location);
    setLocation(location);
    setShowPickLocationModal(!showPickLocationModal);
  };

  return (
    <View style={styles.full}>
      <ScrollView>
        {cart.map((item, key) => (
          <SingleCart key={key} showRemove cartItem={item} />
        ))}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery</Text>
            <TouchableOpacity
              onPress={() => setShowDeliveryOptions(!showDeliveryOptions)}>
              <Text>change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionBody}>
            {!delivery ? (
              <TouchableOpacity
                onPress={() => setShowDeliveryOptions(!showDeliveryOptions)}
                style={styles.deliveryBtn}>
                <Text style={styles.btnText}>Pick Delivery Option</Text>
              </TouchableOpacity>
            ) : null}
            {delivery ? (
              <DeliveryOption
                // openChoices={() => setShowDeliveryOptions(!showDeliveryOptions)}
                choice={deliveryChoices[delivery - 1]}
                canRemove
              />
            ) : null}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Address</Text>
            <TouchableOpacity
              onPress={() => setShowPickLocationModal(!showPickLocationModal)}>
              <Text>change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionBody}>
            {!location ? (
              <TouchableOpacity
                onPress={() => setShowPickLocationModal(!showPickLocationModal)}
                style={styles.deliveryBtn}>
                <Text style={styles.btnText}>Pick Delivery Address</Text>
              </TouchableOpacity>
            ) : null}
            {location ? <AddressCard address={location?.address} /> : null}
          </View>
        </View>
      </ScrollView>

      {/* Modal for selecting Delivery option */}
      <Modal
        transparent={true}
        visible={showDeliveryOptions}
        onDismiss={() => setShowDeliveryOptions(!showDeliveryOptions)}>
        <View style={styles.modalShadow}>
          <View style={styles.deliveryModal}>
            <View style={styles.sectionHeader}>
              <Text>Choose option</Text>
              <TouchableOpacity
                onPress={() => setShowDeliveryOptions(!showDeliveryOptions)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionBody}>
              {deliveryChoices.map((choice, key) => (
                <DeliveryOption
                  selected={() => {
                    setDelivery(key + 1);
                    setShowDeliveryOptions(!showDeliveryOptions);
                  }}
                  key={key}
                  chosen={delivery === key + 1}
                  choice={choice}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
      {/* end of Modal for selecting Delivery Option */}

      {/* Modal for selection delivery location */}
      <Modal
        visible={showPickLocationModal}
        transparent={true}
        onDismiss={() => setShowPickLocationModal(!showPickLocationModal)}>
        <View style={styles.modalShadow}>
          <View style={styles.locationModal}>
            <View style={styles.sectionHeader}>
              <Text>Choose your drop-off location</Text>
              <TouchableOpacity
                onPress={() =>
                  setShowPickLocationModal(!showPickLocationModal)
                }>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.sectionBody, {flex: 1}]}>
              <LocationView
                apiKey={'AIzaSyAtsKSqZLKQeh4oZAk05n5zYwZ_GswtzHk'}
                initialLocation={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                }}
                onLocationSelect={handleLocationSelected}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* End of Modal for selecting Delivery location */}
    </View>
  );
};

export default InvoicePage;

const DeliveryOption = ({chosen, choice, selected, canRemove, openChoices}) => {
  // console.log(choice)
  return (
    <TouchableOpacity onPress={selected} style={[styles.deliveryCard]}>
      <View style={styles.deliveryOptionLabelHolder}>
        <Text style={styles.label1}>
          {choice?.title} - {choice?.price}
        </Text>
        <Text style={styles.label2}>{choice?.description}</Text>
      </View>
      <View style={styles.iconBtnHolder}>
        <View
          onPress={canRemove ? openChoices : () => {}}
          style={[
            styles.iconBtn,
            // eslint-disable-next-line react-native/no-inline-styles
            {backgroundColor: chosen ? colors.info : '#fff'},
          ]}>
          <Feather
            name={!canRemove ? 'check' : 'truck'}
            size={27}
            color={chosen ? colors.white : colors.info}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const AddressCard = ({address}) => {
  return (
    <View style={styles.addressCard}>
      <View style={styles.addressCardRow}>
        <Text>Address #1</Text>
        <Feather name="home" size={27} color={colors.info} />
      </View>
      <View style={styles.addressCardRow}>
        <Text style={styles.label2}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressCardRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  addressCard: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    borderColor: colors.info,
    borderWidth: 2,
    padding: 10,
    borderRadius: 12,
  },
  iconBtn: {
    height: 60,
    width: 60,
    borderRadius: 30,
    elevation: 2,
    // shadowOffset: 10,
    shadowOpacity: 0.4,
    shadowColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnHolder: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label1: {fontSize: 22, fontWeight: 'bold'},
  label2: {fontSize: 16, fontWeight: 'bold'},
  deliveryOptionLabelHolder: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  full: {
    padding: 10,
  },
  section: {
    backgroundColor: colors.primaryBackground,
    elevation: 2,
    marginVertical: 10,
  },
  sectionHeader: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.info,
  },
  sectionBody: {
    padding: 10,
  },
  deliveryBtn: {
    height: 50,
    padding: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primaryColor,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 6,
    borderEndColor: colors.primaryColor,
    // backgroundColor: 'red',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryModal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 500,
    width: '100%',
    backgroundColor: colors.primaryBackground,
  },
  locationModal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height,
    width: '100%',
    backgroundColor: colors.primaryBackground,
  },
  deliveryCard: {
    height: 120,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: colors.info,
    borderWidth: 2,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  modalShadow: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
