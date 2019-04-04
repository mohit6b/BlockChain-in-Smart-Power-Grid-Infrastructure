import React, { Component } from 'react';

const dialog = (props) => {
  return (
    <div className="w3-modal w3-large w3-display-middle" style={{display: props.show ? 'block' : 'none'}}>
      <div className="w3-modal-content w3-card-4 w3-animate-zoom w3-padding-large" style={{maxWidth: '450px'}}>
        <div className="w3-center"><br></br>
          <span 
            onClick={props.onClose}
            className="w3-button w3-xlarge w3-hover-red w3-display-topright">&times;</span>
        </div>

        <div className="w3-container">
          {props.children}
        </div>

      </div>
    </div>
  );
}
export default dialog;