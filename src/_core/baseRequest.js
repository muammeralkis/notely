import axios from 'axios';
import {Alert} from 'react-native';

axios.defaults.baseURL = 'http://localhost:3000/';

const baseRequest = {
  request: async (method, path, params) => {
    try {
      const result = await axios({
        method,
        url: path,
        data: params,
      });
      return result;
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message, [{text: 'Ok'}]);
    }
  },
  get: path => baseRequest.request('GET', path),
  post: (path, params) => baseRequest.request('POST', path, params),
  put: (path, params) => baseRequest.request('PUT', path, params),
  delete: (path, params) => baseRequest.request('DELETE', path, params),
};
export default baseRequest;
