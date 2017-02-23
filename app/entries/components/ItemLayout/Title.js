import React from 'react';

function Title(props) {
  return (
    <div className="panel panel-default" style={{marginRight:"30px"}}>
      <div className="panel-body">
        <h2>{props.title}</h2>
        <h3>{props.price ? props.price.amounts['EUR'] : "Price Upon Request"}</h3>
        <p>Measurements:</p>
        <p>{props.measurements ? props.measurements.display : ""}</p>
    </div>
  </div>
  );
}

export default Title;
