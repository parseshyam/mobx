import { decorate, observable } from 'mobx';
import { post } from 'services';
import { createContext } from 'react';
import { observer } from 'mobx-react-lite';

class RootStore {
  loading = false;
  error = '';
  userData = {};
  authenticateUser = async body => {
    console.log('what this holds', this);
    try {
      console.log('BODY', body);
      this.loading = true;
      const response = await post({
        url: '/users/login',
        body,
      });
      console.log({ response });
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
