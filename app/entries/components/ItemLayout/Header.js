import React from 'react';

function Header(props) {
  return (
    <div className="panel-body">
      <div className="row">
        <div className="panel panel-default" style={{margin:"15px"}}>
          <div className="panel-body">
            <div className="col-md-2">
              <a href={__dirname}><span className="glyphicon glyphicon-menu-left"></span>Home</a>
            </div>
            <div className="col-md-8 text-center">
            <h2> {(props.seller ? props.seller.company : '')} </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
