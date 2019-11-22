import { decorate, observable, action } from 'mobx';
import { GetUsersPost, blockOrDelete } from 'services';

export class UserStore {
  constructor(rootStore) {
    this.root = rootStore;
  }
  errors = false;
  loading = false;
  users = [];
  totalCount = 0;
  blockLoading = null;
  deleteLoading = null;
  editLoading = null;
  getUsers = async (page, count, body) => {
    this.loading = true;
    try {
      const response = await GetUsersPost({
        url: `/admin/getusers/pageNo/${page}/pageCount/${count}`,
        body,
        headers: {
          'x-accessToken': localStorage.getItem('accessToken'),
        },
      });
      this.users = response.rows;
      this.totalCount = response.count;
      console.log('GETresponse');
    } catch (error) {
      console.log(error);
      this.errors = true;
    } finally {
      this.loading = false;
      this.errors = false;
    }
  };

  delete = async userId => {
    this.loading = true;
    this.deleteLoading = userId;
    try {
      const response = await blockOrDelete({
        url: `/admin/delete/${userId}`,
      });
      if (response) {
        let item = this.users.findIndex(item => item.id === userId);
        this.users[item].deletedAt = new Date();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.deleteLoading = null;
      this.loading = false;
    }
  };

  unDelete = async userId => {
    this.loading = true;
    this.deleteLoading = userId;
    try {
      const response = await blockOrDelete({
        url: `/admin/unDelete/${userId}`,
      });
      if (response) {
        let item = this.users.findIndex(item => item.id === userId);
        this.users[item].deletedAt = null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.deleteLoading = null;
      this.loading = false;
    }
  };

  block = async userId => {
    this.blockLoading = userId;
    this.loading = true;
    try {
      const response = await blockOrDelete({
        url: `/admin/block/${userId}`,
      });
      console.log(response);
      if (response) {
        let item = this.users.findIndex(item => item.id === userId);
        this.users[item].isBlocked = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.blockLoading = null;
      this.loading = false;
    }
  };

  unBlock = async userId => {
    this.blockLoading = userId;
    this.loading = true;
    try {
      const response = await blockOrDelete({
        url: `/admin/unBlock/${userId}`,
      });
      console.log(response);
      if (response) {
        let item = this.users.findIndex(item => item.id === userId);
        this.users[item].isBlocked = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.blockLoading = null;
      this.loading = false;
    }
  };

  editUser = async userId => {
    this.blockLoading = userId;
    this.loading = true;
    try {
      const response = await blockOrDelete({
        url: `/admin/block/${userId}`,
      });
      console.log(response);
      if (response) {
        let item = this.users.findIndex(item => item.id === userId);
        this.users[item].isBlocked = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.blockLoading = null;
      this.loading = false;
    }
  };
}

decorate(UserStore, {
  users: observable,
  getUsers: observable,
  errors: observable,
  delete: action,
  block: action,
  unBlock: action,
  unDelete: action,
  blockLoading: observable,
  deleteLoading: observable,
  loading: observable,
  totalCount: observable,
});
