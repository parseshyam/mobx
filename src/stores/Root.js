import { decorate, observable } from 'mobx';
import { post } from 'services';
import { createContext } from 'react';
import { UserStore } from './User';
class RootStore {
  loading = false;
  error = '';
  userData = {};
  LoggedIn = false;
  user = null;

  constructor() {
    this.userStore = new UserStore(this);
  }

  authenticateUser = async body => {
    try {
      this.loading = true;
      const response = await post({
        url: '/users/login',
        body,
      });
      console.log({ response });
      return response.data;
    } catch (e) {
      this.error = e.message;
      console.log(e);
    } finally {
      this.loading = false;
      this.error = '';
    }
  };
}

decorate(RootStore, {
  userData: observable,
  loading: observable,
  error: observable,
});

export const rootStore = createContext(new RootStore());
