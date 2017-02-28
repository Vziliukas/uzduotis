import React, { Component } from 'react';

import Header from './ItemLayout/Header';
import Picture from './ItemLayout/Picture';
import Title from './ItemLayout/Title';
import Description from './ItemLayout/Description';
import axios from 'axios';

class ItemLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: []
    }
  }

  componentDidMount() {
  axios
    .get(__dirname + 'item/' + this.props.params.id +'/data')
    .then(res => this.setState({ item: res.data }))
    .catch(err => console.log(err))
}

  render() {
    const { item } = this.state;
    const { seller } = item;

      return(
        <div className="container" style={{paddingTop: "30px"}}>
          <div className="panel panel-default">
              <Header seller={seller} />
              <div className="row">
                <div className="col-md-4">
                <Picture src={item.image} />
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <Title title={item.title} price={item.price} measurements={item.measurements} />
                  </div>
                  <div className="row">
                  <Description description={item.description} creators={item.creators}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
   }
}

export default ItemLayout;
