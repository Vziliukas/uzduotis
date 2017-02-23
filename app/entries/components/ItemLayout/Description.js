import React from 'react';

function Description(props) {
  return (
    <div className="panel panel-default" style={{marginRight:"30px"}}>
      <div className="panel-body">
      <h3>{props.description}</h3>
      <p>Creator: {props.creators}</p>
    </div>
  </div>
  );
}

export default Description;
