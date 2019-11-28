import { decorate, observable, action } from 'mobx';
import Axios from 'axios';
import { ngrok } from '../config';
const url = `${ngrok}/admin/getPools`;
export class PoolsStore {
  constructor(rootStore) {
    this.root = rootStore;
  }
  loading = false;
  pools = [];
  totalCount = 0;
  editLoading = null;
  deleteLoading = null;
  getPools = async (page = 1, count = 10, body = {}) => {
    this.loading = true;
    try {
      let response = await Axios.post(
        `${url}/pageNo/${page}/pageCount/${count}`,
        body
      );
      // console.log(response);
      if (response) {
        this.pools = response.data.data.rows;
        this.totalCount = response.data.data.count;
      }
      console.log(this.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  };

  updatePool = async (body, id) => {
    // this.deleteLoading = id;
    this.loading = true;
    console.log(body);
    try {
      let updatePool = await Axios.post(
        `${ngrok}${`/admin/updatePoolsById/${id}`}`,
        body
      );

      console.log(updatePool);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      // this.deleteLoading = null;
    }
  };

  deletePool = async id => {
    this.loading = id;
    this.deleteLoading = id;
    try {
      let deletePool = await Axios.delete(
        `${ngrok}${`/admin/pool/delete/${id}`}`
      );
      let item = this.pools.findIndex(item => item.id === id);
      this.pools[item].deletedAt = Date.parse(new Date());
      console.log(deletePool);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      this.deleteLoading = null;
    }
  };

  unDeletePool = async id => {
    this.loading = true;
    this.deleteLoading = id;
    try {
      let unDeletePool = await Axios.delete(
        `${ngrok}${`/admin/pool/unDelete/${id}`}`
      );
      let item = this.pools.findIndex(item => item.id === id);
      this.pools[item].deletedAt = null;
      console.log(unDeletePool);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      this.deleteLoading = null;
    }
  };
}

decorate(PoolsStore, {
  loading: observable,
  pools: observable,
  editLoading: observable,
  totalCount: observable,
  getPools: action,
  deleteLoading: observable,
  deletePool: action,
  unDeletePool: action,
});
