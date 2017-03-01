import React from 'react';
import { Link } from 'react-router';

function Product(props) {
  return (
    <div className="col-md-4">
    <Link to={"items/" + props.id}><img src={props.src} className="img-responsive"/></Link>
      <div className="row">
        <div className="col-md-6">
          <h3> {props.price} </h3>
        </div>
        <div className="col-md-6 text-center">
          <a href="#" onClick={props.setFavourite} className="btn"><span className={(props.liked() ? "glyphicon glyphicon-heart" : "glyphicon glyphicon-heart-empty")}></span></a>
        </div>
      </div>
    </div>
  );
}

export default Product;
