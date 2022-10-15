import React from 'react';

import './HeaderComponent.css'

const HeaderComponent = (props) => (
  <div className='header'>
    <h1>MFE Header</h1>
    <div className="spacer"></div>
    <div>Counter: {props.counter} </div>
  </div>
);
export default HeaderComponent;