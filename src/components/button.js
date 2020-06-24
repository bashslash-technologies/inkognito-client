import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const ButtonComponent = props => {
  return (
    <TouchableOpacity activeOpacity={props.active} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

ButtonComponent.defaultProps = {
  active: 0.7,
};

ButtonComponent.propTypes = {
  active: PropTypes.number,
};

export default ButtonComponent;
