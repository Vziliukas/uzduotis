import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import axios from 'axios';

class DataStore extends EventEmitter {
  constructor() {
    super();

    this.data = {};
    this.favItems = [];
    this.loadProducts(0, 9);
  }

  loadProducts(start, limit) {
    axios
        .get(__dirname + 'data?start=' + start)
        .then(res => {
          Object.assign(this.data, res.data);
          this.data.start = start;
          this.data.limit = limit;
          this.emit('change');
        })
        .catch(err => console.log(err));
  }

  loadMoreProducts(start, limit) {
    axios
        .get(__dirname + 'data?start=' + start + '&limit=' + limit)
        .then(res => {
          Object.assign(this.data, res.data);
          this.data.limit = limit || 9;
          this.emit('change');
        })
        .catch(err => console.log(err))
  }

  getData() {
    return this.data;
  }

  getFavourite() {
    return this.favItems;
  }

  setFavourite(id) {
    let item = this.getFavById(id, this.favItems);

    if (item) {
      this.setFavState(item);
      this.emit('change');
    }

    if (!item) {
      this.favItems.push({
        id: id,
        state: true
      });
      this.emit('change');
    }
  }

  getFavById(id, arr) {
    for (let i=0; i<arr.length; i++) {
      if (arr[i]['id'] == id) {
        return arr[i];
      }
    }
  }

  setFavState(item) {
    if (item.state) {
      item.state = false;
    }
    else if (!item.state) {
      item.state = true;
    }
  }

  handleActions(action) {
    switch(action.type) {
      case "LOAD_MORE": {
        this.loadMoreProducts(action.start, action.limit);
      }
      case "FAVOURITE": {
        this.setFavourite(action.id);
      }
    }
  }
}

const dataStore = new DataStore;
dispatcher.register(dataStore.handleActions.bind(dataStore));

export default dataStore;
