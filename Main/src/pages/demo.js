import React, { Component } from 'react';
import Iframe from 'react-iframe';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { auth } from '../firebase';

import Header from '../components/Header';
import './demo.css';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.enlargeLeftScreen = this.enlargeLeftScreen.bind(this);
    this.equalizeScreens = this.equalizeScreens.bind(this);
    this.enlargeRightScreen = this.enlargeRightScreen.bind(this);
    this.toggleExplorerPanel = this.toggleExplorerPanel.bind(this);
    this.showExplorerPanel = this.showExplorerPanel.bind(this);
    this.closeExplorerPanel = this.closeExplorerPanel.bind(this);

    this.signOut = this.signOut.bind(this);

    this.state = {
      leftScreenWidth: '50%',
      rightScreenWidth: '50%',
      explorerPanelHeight: '0',
    }
  }

  toggleExplorerPanel() {
    if (this.state.explorerPanelHeight === '0') {
      this.showExplorerPanel();
    } else {
      this.closeExplorerPanel();
    }
  }

  showExplorerPanel() {
    this.setState({explorerPanelHeight: '70%'});
  }
  closeExplorerPanel() {
    this.setState({explorerPanelHeight: '0'});
  }

  enlargeLeftScreen() {
    this.setState({
      leftScreenWidth: '90%',
      rightScreenWidth: '10%'
    })
  }
  equalizeScreens() {
    this.setState({
      leftScreenWidth: '50%',
      rightScreenWidth: '50%'
    })
  }
  enlargeRightScreen() {
    this.setState({
      leftScreenWidth: '10%',
      rightScreenWidth: '90%'
    })
  }

  signOut() {
    auth.doSignOut();
    this.props.history.push('/');
  }

  render() {
    console.log('demo RENDER --> userInfo = ', this.props.userInfo);
    if(!this.props.userInfo) {
      this.props.history.push('/');
      return null;
    }

    const accountPaneStyle = {
      width: '100%',
      height: this.state.explorerPanelHeight,
      position: 'fixed',
      zIndex: '1',
      bottom: '0',
      backgroundColor: 'white',
      overflowX: 'hidden',
      transition: '0.5s',
      paddingTop: '5px',
    }

    return (
      <div>
        <Header isSignedIn={true} history={this.props.history}/>
        <div className="deepSkyBlueBG w3-padding w3-animate-left">
          <div id="infoBar" className="w3-row" >
            <div className="w3-third">
              
                <div className="infoCell">
                  <i className="fa fa-cube" aria-hidden="true" style={{fontSize: '25px'}}></i>&nbsp;
                  Number of Blocks: <span style={{color: 'gold'}}>5285671</span>
                </div>
                <div className="infoCell">
                <i className="material-icons" style={{fontSize: '25px'}}>directions_boat</i>&nbsp;
                  Number of Txns: <span style={{color: 'gold'}}>871698298</span>
                </div>
                <div className="infoCell">
                  <i className="fa fa-cube" aria-hidden="true" style={{fontSize: '25px'}}></i>&nbsp;
                  Blocks since yesterday: <span style={{color: 'gold'}}>1087</span>
                </div>
              
            </div>

            <div className="w3-third">
              <div style={{ width: '300px', margin: '0 auto'}}>
                <div className="btnCell" onClick={this.enlargeLeftScreen}>
                  <i className="fa fa-long-arrow-right" aria-hidden="true" style={{fontSize: '25px'}}></i>&nbsp;
                  Enlarge left screen
                </div>
                <div className="btnCell" onClick={this.equalizeScreens}>
                  <i className="fa fa-exchange" aria-hidden="true" style={{fontSize: '25px'}}></i>&nbsp;
                  Equalize two screens
                </div>
                <div className="btnCell" onClick={this.enlargeRightScreen}>
                  <i className="fa fa-long-arrow-left" aria-hidden="true" style={{fontSize: '25px'}}></i>&nbsp;
                  Enlarge right screen
                </div>
              </div>
            </div>

            <div className="w3-third">
              <div style={{ width: '300px', margin: '0 auto'}}>
                <div className="btnCell" onClick={this.toggleExplorerPanel}>
                  <i class="fa fa-cube" aria-hidden="true"></i>
                  <i class="fa fa-cube" aria-hidden="true"></i>
                  <i class="fa fa-cube" aria-hidden="true"></i>&nbsp;
                  Block Explorer
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
        
        <div className="Demo">
          <Iframe url="http://localhost:3001"
                  id="myId"
                  width={this.state.leftScreenWidth}
                  height="75vh"
		              marginRight= '0px'
                  className="myClassname"
                  display="initial"
                  position="relative"
                  allowFullScreen/>

          <Iframe url="http://localhost:3002"
                  id="myId"
                  width={this.state.rightScreenWidth}
                  height="75vh"
                  className="myClassname"
                  display="initial"
                  position="relative"
                  allowFullScreen/>
        </div>
        <div style={accountPaneStyle} className="w3-text-gray">
          <Iframe url="http://sc-explorer.us-east-1.elasticbeanstalk.com/"
                  id="myId"
                  width="100%"
                  height="75vh"
                  className="myClassname"
                  display="initial"
                  position="relative"
                  allowFullScreen/>
        </div>
        


      </div>
    );
  }
}

const mapStateToProps = function(store) {
  console.log('demo.js --> mapStateToProps() --> store:', store);
  return {
    userInfo: store.auth.userInfo
  };
}

export default connect(mapStateToProps)(Demo);
