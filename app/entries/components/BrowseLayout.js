import React, { Component } from 'react';

import Product from './BrowseLayout/Product';
import dataStore from '../stores/DataStore';
import * as DataActions from '../actions/DataActions';
import { Button } from 'react-bootstrap'


export default class BrowseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: dataStore.getData(),
      favItems: dataStore.getFavourite()
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    dataStore.on('change', () => {
      this.setState({
        items : dataStore.getData(),
        favItems: dataStore.getFavourite()
      });
    });
  }

  componentWillUnmount() {
    dataStore.removeAllListeners();
  }

  setFavourite(id) {
    DataActions.setFavourite(id);
  }

  getFavState(id) {
    let items = this.state.favItems;
    if (items) {
      for (let i=0; i< items.length; i++) {
        if (items[i]['id'] == id) {
          return items[i]['state'];
        }
      }
    }
  }

  loadMore() {
    let items = this.state.items;
    DataActions.loadMore(items.start, items.limit + 9);
  }

  render() {
    let Correct = [];
    if (Object.keys(this.state.items).length) {
      const product = this.state.items;
      let Prod = [];
      let ProductComponents = product.items.map((item) => {
        return (
                <Product key={item.id} id={item.id} setFavourite={this.setFavourite.bind(this, item.id)} liked={this.getFavState.bind(this, item.id)} src={item.image} price={(item.price && item.price.amounts) ? item.price.amounts['EUR'] : "Price Upon Request"}/>
        )
      }, this);

      for (let i=0; i < ProductComponents.length; i+=3) {
        let array = [];
        array.push(ProductComponents[i]);
        array.push(ProductComponents[i+1]);
        array.push(ProductComponents[i+2]);
        Prod.push(array);
      }

      Correct = Prod.map((item) => {
        return (
          <div className="panel panel-default">
            <div className="panel-body">
              {item}
            </div>
          </div>
        )
      })
    }

    return (
      <div className="container" style={{paddingTop: "30px"}}>
        <div className="panel panel-default">
        <div className="header text-center">
          <h1>Browse Page</h1>
        </div>
          <div className="panel-body">
            {Correct}
            <div className="text-center">
            <Button onClick={this.loadMore}>Load More</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
