import React from 'react';

function Picture(props) {
  return (
    <div className="panel panel-default" style={{marginLeft: "15px"}}>
      <div className="panel-body">
      <img className="img-responsive" src={props.src} style={{width: "100%"}}/>
      </div>
      </div>
  );
}

export default Picture;
