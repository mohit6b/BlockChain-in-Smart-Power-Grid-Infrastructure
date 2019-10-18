import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

import './home.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);

  }

  handleSignInClick() {
    this.props.history.push('/signin');
  }

  handleSignUpClick() {
    this.props.history.push('/signup');
  }

  render() {
    console.log('home RENDER --> userInfo = ', this.props.userInfo);
    if(this.props.userInfo) {
      this.props.history.push('/dashboard');
      return null;
    }

    return (
      <div className="Home">
        <Header isSignedIn={false} />
        
        <div className="w3-display-container w3-blue w3-center w3-animate-left" style={{height: '500px'}}>
          <div className="w3-container w3-display-middle">
            
            <div className="mainMsg">Smart Power Grid</div>
            
            <div className="mainMsg" style={{color: '#474747'}}>Manage Power Supply with IoTBlockChain</div>
            <br></br>

            <div className="w3-large w3-row">
              <div className="w3-half w3-padding">
                <button 
                  className="w3-button w3-dark-grey w3-border-dark-grey w3-round-large buttonSize"
                  onClick={this.handleSignInClick}>Sign in</button>
              </div>
              <div className="w3-half w3-padding">
                <button 
                  className="w3-button w3-dark-grey w3-border-dark-grey w3-round-large  buttonSize"
                  onClick={this.handleSignUpClick}>Sign up</button>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  console.log('dashboard.js --> mapStateToProps() --> store:', store);
  return {
    userInfo: store.auth.userInfo
  };
}

export default connect(mapStateToProps)(Home);
