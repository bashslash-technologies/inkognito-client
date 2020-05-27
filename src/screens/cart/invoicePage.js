import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {CartContext} from '../../context/cart';
import SingleCart from './singleCart';
import colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';

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

const InvoicePage = () => {
  const {cart} = useContext(CartContext);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [deliveryChoices, setDeliveryChoices] = useState(deliveryOptions);
  const [delivery, setDelivery] = useState(null);
  const [location, setLocation] = useState(null);
  return (
    <View style={styles.full}>
      <ScrollView>
        {cart.map((item, key) => (
          <SingleCart key={key} showRemove cartItem={item} />
        ))}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery</Text>
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
                openChoices={() => setShowDeliveryOptions(!showDeliveryOptions)}
                choice={deliveryChoices[delivery - 1]}
                canRemove
              />
            ) : null}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Address</Text>
          </View>
          <View style={styles.sectionBody}>
            {!location ? (
              <TouchableOpacity
                onPress={() => setShowDeliveryOptions(!showDeliveryOptions)}
                style={styles.deliveryBtn}>
                <Text style={styles.btnText}>Pick Delivery Address</Text>
              </TouchableOpacity>
            ) : null}
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
    </View>
  );
};

export default InvoicePage;

const DeliveryOption = ({chosen, choice, selected, canRemove, openChoices}) => {
  // console.log(choice)
  return (
    <TouchableOpacity onPress={selected} style={[styles.deliveryCard]}>
      <View
        style={{
          flex: 3,
          display: 'flex',
          justifyContent: 'center',
          // alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          {choice?.title} - {choice?.price}
        </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          {choice?.description}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={canRemove ? openChoices : () => {}}
          style={{
            height: 60,
            width: 60,
            backgroundColor: chosen ? colors.info : '#fff',
            borderRadius: 30,
            elevation: 2,
            shadowOffset: 10,
            shadowOpacity: 0.4,
            shadowColor: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather
            name={!canRemove ? 'check' : 'x'}
            size={27}
            color={chosen ? colors.white : colors.info}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  deliveryCard: {
    height: 120,
    width: '90%',
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
