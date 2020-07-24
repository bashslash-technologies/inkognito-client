import AsyncStorage from '@react-native-community/async-storage';

export const BASE_URL = 'https://7d19042d737d.ngrok.io';
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
