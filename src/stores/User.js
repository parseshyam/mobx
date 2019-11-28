import { decorate, observable, action } from 'mobx';
import { GetUsersPost, blockOrDelete } from 'services';
import Axios from 'axios';
const { ngrok } = require('../config');
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
    this.deleteLoading = userId;
    this.loading = true;
    try {
      const response = await blockOrDelete({
        url: `/admin/user/delete/${userId}`,
      });
      if (response) {
        let item = this.users.findIndex(item => item.id === userId);
        this.users[item].deletedAt = Date.parse(new Date());
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.deleteLoading = null;
      this.loading = false;
    }
  };

  unDelete = async userId => {
    this.deleteLoading = userId;
    this.loading = true;
    try {
      const response = await blockOrDelete({
        url: `/admin/user/unDelete/${userId}`,
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
        url: `/admin/user/block/${userId}`,
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
        url: `/admin/user/unBlock/${userId}`,
      });
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

  editUser = async (body, id) => {
    // this.blockLoading = id;
    console.log('BODY', body, id);
    this.loading = true;
    try {
      let updateUser = await Axios.post(
        `${ngrok}${`/admin/updateUser/${id}`}`,
        body
      );
      console.log(updateUser);
      // if (response) {
      //   let item = this.users.findIndex(item => item.id === id);
      //   this.users[item].isBlocked = true;
      // }
    } catch (error) {
      console.log(error);
    } finally {
      // this.blockLoading = null;
      this.loading = false;
    }
  };
}

decorate(UserStore, {
  users: observable,
  getUsers: action,
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
