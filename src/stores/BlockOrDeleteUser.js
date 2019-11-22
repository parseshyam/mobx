import { decorate, observable } from 'mobx';
import { blockOrDelete } from 'services';

export class BlockOrDelete {
  constructor(rootStore) {
    this.root = rootStore;
  }
  errors = false;
  loading = null;
}

decorate(BlockOrDelete, {
  errors: observable,
  loading: observable,
});
