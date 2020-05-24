import {showMessage} from 'react-native-flash-message';

const validate = (data, errorMsg, type = '') => {
  let valid = true;
  if (type === 'email') valid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data);
  if (type === 'contact') valid = data.length >= 10;
  if (type === 'password') valid = data.length >= 6;
  if (data.trim() === '' || valid === false) {
    showMessage({
      message: 'Error',
      description: errorMsg,
      type: 'danger',
    });
    return false;
  }
  return true;
};

export {validate};
