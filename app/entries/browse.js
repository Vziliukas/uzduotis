import React from 'react';
import ReactDOM from 'react-dom';
import BrowseLayout from './components/BrowseLayout';
import ItemLayout from './components/ItemLayout';
import 'bootstrap/dist/css/bootstrap.css';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={BrowseLayout}></Route>
    <Route path="items/:id" component={ItemLayout}></Route>
  </Router>,
document.getElementById('root'));
