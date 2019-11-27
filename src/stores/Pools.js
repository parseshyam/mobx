import { decorate, observable, action, comparer } from 'mobx';
import Axios from 'axios';
const ngrok = 'http://4c80f1f9.ngrok.io';
const url = `${ngrok}/admin/getPools`;
export class PoolsStore {
  constructor(rootStore) {
    this.root = rootStore;
  }
  loading = false;
  pools = [];
  totalCount = 0;
  editLoading = null;
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
    }
  };
}

decorate(PoolsStore, {
  loading: observable,
  pools: observable,
  editLoading: observable,
  totalCount: observable,
  getPools: action,
});
