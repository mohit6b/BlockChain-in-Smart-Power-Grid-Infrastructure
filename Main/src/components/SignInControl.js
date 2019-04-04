import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../firebase';
import Logo from '../assets/iiitg_logo.png'

import './SignInControl.css';

class SignInControl extends Component {
  constructor(props) {
    super(props);

    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.showAccountPane = this.showAccountPane.bind(this);
    this.closeAccountPane = this.closeAccountPane.bind(this);

    this.state = {
      accoutPaneWidth: '0'
    }
  }

  handleSignOutClick() {
    auth.doSignOut();
    this.props.history.push('/');
  }
  showAccountPane() {
    this.setState({accoutPaneWidth: '320px'});
  }
  closeAccountPane() {
    this.setState({accoutPaneWidth: '0'});
  }

  render() {
    const isSignedIn = this.props.isSignedIn;
    
    const firstName = isSignedIn ? this.props.userInfo.firstName: null;
    const lastName = isSignedIn ? this.props.userInfo.lastName: null;
    const role = isSignedIn ? this.props.userInfo.role: null;

    let button;
    const accountPaneStyle = {
      width: this.state.accoutPaneWidth,
      height: '100%',
      position: 'fixed',
      zIndex: '1',
      top: '0',
      right: '0',
      backgroundColor: 'white',
      overflowX: 'hidden',
      transition: '0.5s',
      paddingTop: '5px',
    }

    if (isSignedIn) {
      button = (
        <div className="w3-cell-row">
          <div className="w3-cell w3-right buttonCell pointer" title="Account" onClick={this.showAccountPane}>
            <i className="fa fa-user-circle-o w3-text-gray" style={{fontSize: '30px'}}></i>
          </div>
          <div className="w3-cell w3-right buttonCell pointer" title="Dashboard" onClick={() => this.props.history.push('/dashboard')}>
          <i className="material-icons w3-text-gray" style={{fontSize: '35px'}}>view_module</i>
          </div>
          <div className="w3-cell w3-right buttonCell pointer" title="User Section" onClick={() => this.props.history.push('/demo')}>
            <i className="material-icons w3-text-gray" style={{fontSize: '35px'}}>launch</i>
          </div>
        </div>
      );
    } else {
      button = null;
    }

    return (
      <div>
        {button}
        <div style={accountPaneStyle} className="w3-text-gray">
          <div className="w3-cell-row w3-padding">
            <div className="w3-cell w3-left">
              <i className="fa fa-user-circle w3-text-gray" style={{fontSize: '35px', position: 'relative', top: '7px'}}></i>
            </div>
            <div className="w3-cell w3-xlarge w3-padding">
              <b>Account</b>&nbsp;&nbsp;&nbsp;
            </div>
            <div className="w3-cell w3-xlarge w3-padding" onClick={this.closeAccountPane}>
              <i className="fa fa-close pointer"></i>
            </div>
          </div>
          
          <div className="w3-large w3-padding w3-left">
            <div className="w3-cell w3-left-align" style={{ width: '30px' }}>
              <i className="large material-icons w3-text-gray" style={{fontSize: '30px', position: 'relative', top: '10px'}}>assignment_ind</i>
            </div>
            <div className="w3-cell w3-left-align w3-padding" style={{ width: '250px' }}>
              <b>{ firstName } { lastName }</b>
            </div>
          </div>

          <div className="w3-large w3-padding w3-left">
            <div className="w3-cell w3-centered  w3-left-align" style={{ width: '30px' }}>
              <i className="large material-icons w3-text-gray" style={{fontSize: '30px', position: 'relative', top: '10px'}}>face</i>
              
            </div>
            <div className="w3-cell w3-left-align w3-padding" style={{ width: '250px' }}>
              <b>{ role }</b>
            </div>
          </div>

          <div className="w3-large w3-padding w3-left">
            <div className="w3-cell pointer w3-right-align" style={{ width: '30px' }} onClick={this.handleSignOutClick}>
              <i className="fa fa-sign-out w3-text-gray" style={{fontSize: '30px', position: 'relative', top: '5px'}}></i>
            </div>
            <div className="w3-cell w3-left-align w3-padding pointer" style={{ width: '120px' }} onClick={this.handleSignOutClick}>
              <b>Sign Out</b>
            </div>
          </div>
            
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  console.log('SignInControl.js --> mapStateToProps() --> store:', store);
  return {
    userInfo: store.auth.userInfo
  };
}

export default connect(mapStateToProps)(SignInControl);
