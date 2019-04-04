import React, { Component } from 'react';
import { connect } from 'react-redux';
import BackgroundImage from 'react-background-image-loader';

import Records from './records';
import Journey from './journey';
import dashboardImg from '../assets/dashboard_image.png'
import Header from '../components/Header';
import DetailImg from '../assets/product_details.jpeg'
import Background from '../assets/background2.jpg'

import './dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: true
    }
  }

  render() {
    console.log('dashboard RENDER --> userInfo = ', this.props.userInfo);
    if(!this.props.userInfo) {
      this.props.history.push('/');
      return null;
    }

    return (

      <div className="DashBoard">
        <Header isSignedIn={true} history={this.props.history}/>

        <div className="w3-container w3-animate-left deepSkyBlueBG ">
          <div className="w3-container w3-padding w3-row centeredDiv" style={{width: '95vw', maxWidth: '900px'}}>
            <div className="w3-container w3-padding w3-third">
              <div className="w3-card-2 w3-round-large w3-padding w3-xlarge w3-center pointer lightPinkBG"
                onClick={() => this.props.history.push('/records')}>
                <i className="fa fa-bar-chart" aria-hidden="true" style={{fontSize: '120px'}}></i><br></br>Statistics
              </div>
            </div>
            <div className="w3-container w3-padding w3-third">
              <div className="w3-card-2 w3-round-large w3-padding w3-xlarge w3-center pointer mediumAquaMarineBG">
                <i className="material-icons" style={{fontSize: '114px'}}>people_outline</i><br></br>Power Supply
              </div>
              </div>
            <div className="w3-container w3-padding w3-third">
              <div className="w3-card-2 w3-round-large w3-padding  w3-xlarge w3-center pointer orangeBG"
                onClick={() => this.props.history.push('/certificate')}>
                <i className="fa fa-address-card-o" aria-hidden="true" style={{fontSize: '120px'}}></i><br></br>Billing
              </div>
            </div>
          </div>


          <div className="w3-container w3-padding w3-row centeredDiv" style={{width: '95vw', maxWidth: '900px'}}>
            <div className="w3-container w3-padding w3-center">
              <div className="w3-card-2 w3-round-large w3-padding  w3-xlarge w3-center pointer lightSkyBlueBG"
                onClick={() => this.props.history.push('/demo')}>
                <div className="fa-animation">
                  <i className="fa fa-cog fa-lg fa-spin"></i>
                  <i className="fa fa-cog fa-md fa-spin"></i>
                </div>
                <div className="fa-animation">
                  <i className="fa fa-cog fa-sm fa-spin"></i>
                </div>
                User Section
              </div>
            </div>
          </div>



          <div className="w3-container w3-padding w3-row centeredDiv" style={{width: '95vw', maxWidth: '900px'}}>
          </div>


          <br></br>
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

export default connect(mapStateToProps)(Dashboard);
