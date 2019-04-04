import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import { Form } from 'semantic-ui-react';
import './Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.showAccountPane = this.showAccountPane.bind(this);
    this.closeAccountPane = this.closeAccountPane.bind(this);
  }

  state = {
    account: '',
    balance: 0,
    showAccount: false,
    accoutPaneWidth: '0',
  };

  async componentWillMount() {
    this.setState({ showAccount: !this.state.showAccount });
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const balanceInEther = await web3.utils.fromWei(balance, 'ether');
    this.setState({ account: accounts[0], balance: balanceInEther });
  }

  getAccountInfo = async () => {
    this.setState({ showAccount: !this.state.showAccount });
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const balanceInEther = await web3.utils.fromWei(balance, 'ether');
    this.setState({ account: accounts[0], balance: balanceInEther });
  };

  showAccountPane() {
    this.setState({accoutPaneWidth: '340px'});
  }

  closeAccountPane() {
    this.setState({accoutPaneWidth: '0'});
  }

  render() {
    const accountPaneStyle = {
      width: this.state.accoutPaneWidth,
      height: '100%',
      position: 'fixed',
      zIndex: '1',
      top: '0',
      right: '0',
      backgroundColor: 'Gainsboro',
      overflowX: 'hidden',
      transition: '0.5s',
      paddingTop: '5px',
    }

    return (
      <div>
        <div className="w3-cell-row w3-container w3-padding-16">
          <div className="w3-cell w3-right buttonCell pointer" title="Account" onClick={this.showAccountPane}>
            <i className="fa fa-user-circle-o" style={{fontSize: '36px'}}></i>
          </div>
          <div className="w3-cell w3-right buttonCell pointer" title="notification">
            <i className="material-icons" style={{fontSize: '36px'}}>notifications_none</i>
          </div>
          <div className="w3-cell w3-right buttonCell pointer" title="alert">
            <i className="material-icons" style={{fontSize: '36px'}}>error</i>
          </div>
          <div className="w3-cell w3-right buttonCell pointer" title="Cattle Journey" onClick={() => this.props.history.push('/supplyDetails/all')}>
            <i className="fa fa-ship" aria-hidden="true" style={{fontSize: '32px'}}></i>
          </div>
          <div className="w3-cell w3-right buttonCell pointer" title="Supply" onClick={() => this.props.history.push('/')}>
            <i className="material-icons" style={{fontSize: '36px'}}>widgets</i>
          </div>
        </div>

        <div style={accountPaneStyle} className="w3-text-dark-gray">
          <div className="w3-cell-row w3-padding">
            <div className="w3-cell w3-left">
              <i className="fa fa-user-circle w3-text-gray" style={{fontSize: '45px', position: 'relative', top: '7px'}}></i>
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
            <div className="w3-cell w3-left-align w3-padding" style={{ width: '270px' }}>
              <b>Dinesh Baruah</b>
            </div>
          </div>

          <div className="w3-large w3-padding w3-left">
            <div className="w3-cell w3-centered  w3-left-align" style={{ width: '30px' }}>
              <i className="large material-icons w3-text-gray" style={{fontSize: '30px', position: 'relative', top: '10px'}}>face</i>
            </div>
            <div className="w3-cell w3-left-align w3-padding" style={{ width: '270px' }}>
              <b>Customer</b>
            </div>
          </div>

          <div className="w3-large w3-padding w3-left">
            <div className="w3-cell w3-centered  w3-left-align" style={{ width: '30px' }}>
              <i className="fa fa-address-card-o w3-text-gray" aria-hidden="true" style={{ fontSize: '25px' }}></i>
            </div>
            <div className="w3-cell w3-left-align w3-padding" style={{ width: '270px' }}>
              <b>Account Address</b>
            </div>
          </div>

          <div className="w3-small w3-padding w3-left">
            <div className="w3-cell w3-left-align" style={{ width: '330px' }}>
              <b>{this.state.account}</b>
            </div>
          </div>

          <div className="w3-large w3-padding w3-left">
            <div className="w3-cell w3-centered  w3-left-align" style={{ width: '30px' }}>
              <i className="fa fa-money w3-text-gray" aria-hidden="true" style={{ fontSize: '25px' }}></i>
            </div>
            <div className="w3-cell w3-left-align w3-padding" style={{ width: '270px' }}>
              <b>Account Balance</b>
            </div>
          </div>

          <div className="w3-small w3-padding w3-left">
            <div className="w3-cell w3-left-align" style={{ width: '330px' }}>
              <b>{this.state.balance}</b>
            </div>
          </div>

          <div className="w3-large w3-padding w3-left">
            <div className="w3-cell pointer w3-right-align" style={{ width: '30px' }}>
              <i className="fa fa-sign-out w3-text-gray" style={{fontSize: '30px', position: 'relative', top: '5px'}}></i>
            </div>
            <div className="w3-cell w3-left-align w3-padding pointer" style={{ width: '120px' }}>
              <b>Sign Out</b>
            </div>
          </div>
            
        </div>
        
      </div>
    );
  }
}


//mqtt
