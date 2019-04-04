import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import Demo from './demo';
import BackgroundImage from 'react-background-image-loader';
import Background from '../assets/background2.jpg'
import Logo from '../assets/Aussi-Food-Logo.png'


import Header from '../components/Header';
import './journey.css';

class Records extends Component {
  constructor(props) {
    super(props);

    this.goToDemo = this.goToDemo.bind(this);

    this.state = {
      auth: true
    }
  }

  goToDemo() {
    this.props.history.push('/demo');
  }

  render() {
    console.log('dashboard RENDER --> userInfo = ', this.props.userInfo);

    if(!this.props.userInfo) {
      this.props.history.push('/');
      return null;
    }

    return (
      <div className="Journey">
        <Header isSignedIn={true} history={this.props.history}/>

        <div id="bodyContainer" className="deepSkyBlueBG w3-animate-left">
          <div className="w3-container w3-padding w3-center w3-text-white h1Size">Power Supply Tracking</div>
          <br/>
          
          <div className="Main dimGrey w3-hide-small w3-hide-medium">
            <div className="w3-container pointer w3-large" onClick={() => this.props.history.push('/records')}>
              <i className="fa fa-bar-chart" aria-hidden="true" style={{fontSize: '100px'}}></i><br/>View Details
            </div>
            
            <div className="tableContainer">
              <table className="w3-table w3-bordered">
                <tr>
                  <td>First</td>
                  <td>Second</td>
                  <td>Third</td>
                  <td>Fourth</td>
                  <td>Fifth</td>
                  <td>Sixth</td>
                  <td>Seventh</td>
                </tr>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="phoneMain dimGrey w3-hide-large">
            <div className="w3-container pointer" onClick={() => this.props.history.push('/records')}>
              <i className="fa fa-bar-chart" aria-hidden="true" style={{fontSize: '60px'}}></i><br/>View Records
            </div>
            
            <div className="phoneTableContainer">
              <table className="w3-table w3-bordered">
                <tr><td>First</td><td>...</td></tr>
                <tr><td>Second</td><td>...</td></tr>
                <tr><td>Third</td><td>...</td></tr>
                <tr><td>Fourth</td><td>...</td></tr>
                <tr><td>Fifth</td><td>...</td></tr>
                <tr><td>Sixth</td><td>...</td></tr>
                <tr><td>Seventh</td><td>...</td></tr>
              </table>
            </div>
          </div>
          <br/>
          <br/>

          <div className="Main dimGrey w3-hide-small w3-hide-medium">
            <div className="w3-container pointer w3-large" onClick={() => this.props.history.push('/records')}>
              <i className="fa fa-bar-chart" aria-hidden="true" style={{fontSize: '100px'}}></i><br/>View Records
            </div>

            <div className="Page-wrap">
              <table className="w3-table w3-bordered">
                <tr>
                  <td>First</td>
                  <td>Second</td>
                  <td>Third</td>
                  <td>Fourth</td>
                  <td>Fifth</td>
                  <td>Sixth</td>
                  <td>Comments/Issues</td>
                </tr>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </table>
            </div>
	        </div>

          <div className="phoneMain dimGrey w3-hide-large">
            <div className="w3-container pointer" onClick={() => this.props.history.push('/records')}>
              <i className="fa fa-bar-chart" aria-hidden="true" style={{fontSize: '60px'}}></i><br/>View Records
            </div>
            
            <div className="phoneTableContainer">
              <table className="w3-table w3-bordered">
                <tr><td>RFID</td><td>...</td></tr>
                <tr><td>Dispatch Weight</td><td>...</td></tr>
                <tr><td>Sale Time Date</td><td>...</td></tr>
                <tr><td>Transfer Time Date</td><td>...</td></tr>
                <tr><td>Transfer Stations</td><td>...</td></tr>
                <tr><td>Destination Time Date</td><td>...</td></tr>
                <tr><td>Comments/Issues</td><td>...</td></tr>
              </table>
            </div>
          </div>
          <br/>
          <br/>

          <div className="Main dimGrey w3-hide-small w3-hide-medium">
            <div className="w3-container pointer w3-large" onClick={() => this.props.history.push('/records')}>
              <i className="fa fa-bar-chart" aria-hidden="true" style={{fontSize: '100px'}}></i><br/>View Records
            </div>

            <div className="Page-wrap" > 
              <table className="w3-table w3-bordered">
                <tr>
                  <td>RFID</td>
                  <td>Purchase Quantity</td>
                  <td>Purchase Time</td>
                  <td>Purchase Date</td>
                </tr>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </table>      
            </div>
          </div>

          <div className="phoneMain dimGrey w3-hide-large">
            <div className="w3-container pointer" onClick={() => this.props.history.push('/records')}>
              <i className="fa fa-bar-chart" aria-hidden="true" style={{fontSize: '60px'}}></i><br/>View Records
            </div>
            
            <div className="phoneTableContainer">
              <table className="w3-table w3-bordered">
                <tr><td>RFID</td><td>...</td></tr>
                <tr><td>Purchase Quantity</td><td>...</td></tr>
                <tr><td>Purchase Time</td><td>...</td></tr>
                <tr><td>Purchase Date</td><td>...</td></tr>
              </table>
            </div>
          </div>
          <br/>
          <br/>
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

export default connect(mapStateToProps)(Records);
