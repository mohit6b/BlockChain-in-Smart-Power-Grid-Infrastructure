import React, { Component } from 'react';
import SignInControl from './SignInControl';

import './Header.css'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleDashboardClick = this.handleDashboardClick.bind(this);
  }

  handleDashboardClick() {
    this.props.history.push('/dashboard');
  }

  render() {    
    return (
      <div className="w3-row" style={{height: '50px'}}>
        <div className="w3-col s5 w3-xlarge">
          <div className=" w3-left-align logoFont" style={{ paddingLeft: '10px', paddingTop: '5px'}}>
            <span><b>IIIT Guwahati</b></span><span style={{color: ''}}><b>, Assam</b></span>
          </div>
        </div>
        <div className="w3-col s7 w3-right-align" style={{ padding: '7px'}}>
          <SignInControl isSignedIn={this.props.isSignedIn} history={this.props.history}/>
        </div>
      </div>
    );
  }
}
