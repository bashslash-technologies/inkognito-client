import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

export default function MonoText(props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: `${
            props.type === 'bold'
              ? 'Quicksand-Bold'
              : props.type === 'semi-bold'
              ? 'Quicksand-SemiBold'
              : props.type == 'light'
              ? 'Quicksand-Light'
              : props.type === 'medium'
              ? 'Quicksand-Medium'
              : 'Quicksand-Regular'
          }`,
        },
      ]}
    />
  );
}

MonoText.defaultProps = {
  type: 'regular',
  style: {},
};

MonoText.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
};
