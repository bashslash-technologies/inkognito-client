import React, {Fragment} from 'react';
import {ScrollView, View} from 'react-native';
import Text from '../../components/text';
import Colors from '../../constants/colors';
import CardItem from '../profile/CardItem';

const SettingsComponent = props => {
  return (
    <Fragment>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView>
          <CardItem title={'Change profile name '} icon={'user'} />
          <CardItem title={'Change password '} icon={'lock'} />
          <CardItem title={'Change avatar '} icon={'bell'} />
          <CardItem title={'How it works '} icon={'map-pin'} />
          <CardItem title={'Support '} icon={'credit-card'} />
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default SettingsComponent;
