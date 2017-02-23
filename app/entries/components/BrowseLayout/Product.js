import React from 'react';

function Product(props) {
  return (
    <div className="col-md-4">
    <img src={props.src} className="img-responsive"/>
      <div className="row">
        <div className="col-md-6">
          <h3> {props.price} </h3>
        </div>
        <div className="col-md-6 text-center">
          <a href="#" onClick={props.setFavourite} className="btn"><span className={(props.liked ? "glyphicon glyphicon-heart" : "glyphicon glyphicon-heart-empty")}></span></a>
        </div>
      </div>
    </div>
  );
}

export default Product;
