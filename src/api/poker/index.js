import { wait } from '../../utils/wait';
import axios from 'axios';
import { apiConfig } from '../../config';

class PokerApi {
  
  async getMembers() {
    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        axios.post(apiConfig.base_url + 'poker/members').then(res => {
          const data = res.data;
          resolve(data);
        })
      } catch (err) {
        console.error('[Poker Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const pokerApi = new PokerApi();
