import { decorate, observable, action } from 'mobx';
// import { post } from 'services';
import { createContext } from 'react';
import { UserStore } from './User';
import { PoolsStore } from './Pools';
import Axios from 'axios';
import { ngrok } from '../config';
class RootStore {
  loading = false;
  error = '';
  userData = {};
  LoggedIn = false;
  user = null;
  constructor() {
    this.userStore = new UserStore(this);
    this.PoolsStore = new PoolsStore(this);
  }
  authenticateUser = async body => {
    this.loading = true;
    const { remember, ...userCredentials } = body;
    try {
      const res = await Axios.post(`${ngrok}/users/login`, userCredentials);
      if (res) {
        localStorage.setItem('accessToken', res.data.data.accessToken);
        localStorage.setItem('refreshToken', res.data.data.refreshToken);
        this.LoggedIn = true;
        this.loading = false;
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new Error('User not found!');
    } finally {
      this.loading = false;
    }
  };
}

decorate(RootStore, {
  userData: observable,
  loading: observable,
  error: observable,
  authenticateUser: action,
});

export const rootStore = createContext(new RootStore());
