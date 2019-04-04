import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '../components/Dialog'
import Dashboard from './dashboard'
import { signUp } from '../actions/signUp'

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleDialogClose = this.handleDialogClose.bind(this);
    // methods for 2 way binding
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleReturn = this.handleReturn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignUpResult = this.handleSignUpResult.bind(this);
    
    this.state = {
      role: '',
      firstName: '',
      lastName: '',
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

  // methods for 2 way binding
  handleRoleChange(event) {
    this.setState({role: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleReturn() {
    this.props.history.push('/');
  }

  handleSignUp() {
    const data = {
      role: this.state.role,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
    }
    signUp(data, this.handleSignUpResult);
  }

  handleSignUpResult(successful, error) {
    console.log('handleSignUpResult() --> successful = ', successful);
    console.log('handleSignUpResult() --> error = ', error);
    
    if(successful) {
      // render() is in charge of routing
    } else {
      this.setState({ 
        dialogTitle: 'Sign-up failed',
        dialogMsg: error,
        showDialog: true
      });
    }
  }
  
  render() {
    // console.log('signup RENDER --> userInfo = ', this.props.userInfo);
    if(this.props.userInfo) {
      this.props.history.push('/dashboard');
      return null;
    }

    return (
      <div className="SignUp"> 
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
                <select 
                  value={this.state.role} 
                  onChange={this.handleRoleChange}
                  className="w3-select w3-border w3-margin-bottom w3-round w3-padding">
                  <option value="" disabled>Select a role</option>
                  <option value="producer">Producer</option>
                  <option value="distributor">Distributor</option>
                  <option value="customer">customer</option>
                </select>
        
                <input type="text" placeholder="First Name" name="firstName" required
                  value={this.state.firstName} 
                  onChange={this.handleFirstNameChange}
                  className="w3-input w3-border w3-padding w3-margin-bottom w3-round"></input>
                  
                <input type="text" placeholder="Last Name" name="lastName" required 
                  value={this.state.lastName} 
                  onChange={this.handleLastNameChange}
                  className="w3-input w3-border w3-padding w3-margin-bottom w3-round"></input>
                  
                <input type="text" placeholder="Username (email)" name="username" required
                  value={this.state.username} 
                  onChange={this.handleUsernameChange}
                  className="w3-input w3-border w3-padding w3-margin-bottom w3-round"></input>
                  
                <input type="password" placeholder="Password" name="password" required 
                  value={this.state.password} 
                  onChange={this.handlePasswordChange}
                  className="w3-input w3-border w3-padding w3-round"></input>
        
                <button className="w3-button w3-block w3-green w3-section w3-padding w3-round" type="button" 
                  onClick={this.handleSignUp}>Sign up</button>
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

export default connect(mapStateToProps)(SignUp);
