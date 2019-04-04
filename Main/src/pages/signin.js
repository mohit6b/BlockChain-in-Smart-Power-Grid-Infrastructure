import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '../components/Dialog'

import Dashboard from './dashboard'
import { signIn } from '../actions/signIn';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleDialogClose = this.handleDialogClose.bind(this);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleReturn = this.handleReturn.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignInResult = this.handleSignInResult.bind(this);
    
    this.state = {
      username: '',
      password: '',

      showDialog: false,
      dialogTitle: '',
      dialogMsg: '',
    }
  }

  handleDialogClose() {
    this.setState({showDialog: false});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleReturn() {
    this.props.history.push('/');
  }

  handleSignIn() {
    console.log('handleSignUp() --> username: ', this.username);
    signIn(this.state.username, this.state.password, this.handleSignInResult);
  }

  handleSignInResult(successful, error) {
    console.log('handleSignInResult() --> successful = ', successful);
    console.log('handleSignInResult() --> error = ', error);
    
    if(successful) {
      // render() is in charge of routing
    } else {
      this.setState({ 
        dialogTitle: 'Sign-in failed',
        dialogMsg: error,
        showDialog: true
      });
    }
  }
  
  render() {
    // console.log('signin RENDER --> userInfo = ', this.props.userInfo);
    if(this.props.userInfo) {
      this.props.history.push('/dashboard');
      return null;
    }

    return (
      <div className="SignIn"> 
        <div className="w3-display-middle">  
          <div className="w3-card-4 w3-padding-large w3-animate-zoom" style={{width: '100vw', maxWidth: '450px'}}>
            <div className="w3-container w3-center">
              
              <span 
                onClick={this.handleReturn}
                style={{cursor: 'pointer'}}
                title="Return Home"
                className="w3-text-grey w3-padding w3-xxlarge w3-display-topright">
                <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>  
              </span>

              <div className="w3-section">
                <i className="fa fa-user-circle-o" style={{color: 'dodgerBlue', fontSize: '120px'}}></i>
              </div>
              
              <div className="w3-section">  
                <input type="text" placeholder="Username" name="username" required 
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  className="w3-input w3-border w3-padding w3-margin-bottom w3-round" ></input>
                <input type="password" placeholder="Password" name="password" required 
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  className="w3-input w3-border w3-padding w3-round" ></input>
                <button  type="button" onClick={this.handleSignIn}
                  className="w3-button w3-block w3-green w3-section w3-padding w3-round">Sign in</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Dialog show={this.state.showDialog} onClose={this.handleDialogClose}>
            <h3> {this.state.dialogTitle} </h3>
            <p>{this.state.dialogMsg}</p>
          </Dialog>
        </div>
		    
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  // console.log('signin.js --> mapStateToProps() --> store:', store);
  return {
    userInfo: store.auth.userInfo
  };
}

export default connect(mapStateToProps)(SignIn);
