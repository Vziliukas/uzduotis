import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import axios from 'axios';

class DataStore extends EventEmitter {
  constructor() {
    super();

    this.data = {};
    this.loadProducts(0, 9);
  }

  loadProducts(start, limit) {
    axios
        .get(__dirname + 'data?start=' + start)
        .then(res => {
          this.data = res.data;
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
          this.data = res.data;
          this.data.limit = limit;
          this.emit('change');
        })
        .catch(err => console.log(err))
  }

  getData() {
    return this.data;
  }

  setFavourite(id) {
    let items = this.data.items;
    for (let i=0; i< items.length; i++) {
        if(items[i].id == id) {
          if(items[i].favourite) {
            items[i].favourite = false;
            this.emit('change');
          }
          else items[i].favourite = true;
          this.emit('change');
        }
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
