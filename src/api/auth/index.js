import { createResourceId } from '../../utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from '../../utils/jwt';
import { wait } from '../../utils/wait';
import { users } from './data';
import axios from 'axios';
import { apiConfig } from '../../config';

class AuthApi {
  async signIn(request) {
    const { name, password } = request;

    await wait(500);

    return new Promise((resolve, reject) => {
      try {
        // Find the user
        axios.post(apiConfig.base_url + 'user/login', { name, password }).then((res) => {
          const data = res.data;
          if (data.success)
            resolve({accessToken: data.token, name: data.name, role: data.role});
        });

      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async getAvatars() {
    await wait(1000);
    return new Promise((resolve, reject) => {
      try {
        axios.get(apiConfig.base_url + 'user/avatars').then((res) => {
          if (res && res.status === 200 && res.data && res.data.success) {
            const data = res.data;
            resolve(data);
          } else {
            reject(new Error('Please check your email and password'));
          }
        });
      } catch (e) {
        console.error('[Auth Api]: ', e);
        reject(new Error('Internal server error'));
      }
    })
  }

  async signUp(request) {
    const { email, name, password, real_name, location, avatar, gender } = request;

    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        axios.post(apiConfig.base_url + 'user/signup', { email, name, password, real_name, location, avatar, gender }).then(res => {
          const data = res.data;
          resolve(data);
        })
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(request) {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const { userId } = decode(accessToken);

        // Find the user
        const user = users.find((user) => user.id === userId);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          plan: user.plan
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
