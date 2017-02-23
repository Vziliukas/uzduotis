import React, { Component } from 'react';

import Product from './BrowseLayout/Product';
import dataStore from '../stores/DataStore';
import * as DataActions from '../actions/DataActions';
import { Button } from 'react-bootstrap';


export default class BrowseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    dataStore.on('change', () => {
      this.setState({
        items : dataStore.getData(),
      });
    });
  }

  setFavourite(id){;
    DataActions.setFavourite(id);
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
                <Product key={item.id} id={item.id} setFavourite={this.setFavourite.bind(this, item.id)} liked={item.favourite} src={item.image} price={(item.price && item.price.amounts) ? item.price.amounts['EUR'] : "Price Upon Request"}/>
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
