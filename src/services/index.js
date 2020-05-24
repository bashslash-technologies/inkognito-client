import AsyncStorage from '@react-native-community/async-storage';

export const BASE_URL = 'http://192.168.8.101:5000';
// export const BASE_URL = 'https://inkognito-server.herokuapp.com';

class Store {
  async storeToken(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(e);
    }
  }

  async getToken(key) {
    try {
      let token = await AsyncStorage.getItem(key);
      return JSON.parse(token);
    } catch (e) {
      console.warn(e);
    }
  }
}

export default new Store();
