import axios from 'axios';

export class RequestHelper {
  async get(apiUrl: string) {
    try {
      const res = await axios.get(apiUrl);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
