import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import {LineChart} from 'react-easy-chart';
import {AreaChart} from 'react-easy-chart';

import Demo from './demo';

import Temp from '../assets/temperature.png';

import Header from '../components/Header';

import './records.css'

class Records extends Component {
  constructor(props) {
    super(props);
    this.changeSensorData = this.changeSensorData.bind(this);

    this.state = {
      temperature: '4.3',
      humidity: '23.7'
    }
  }

  componentWillMount() {
    this.interval = setInterval(this.changeSensorData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeSensorData() {
    if (this.state.temperature === '4.3') {
      this.setState({
        temperature: '4.4',
        humidity: '23.8',
      });
    } else {
      this.setState({
        temperature: '4.3',
        humidity: '23.7',
      });
    }
  }

  render() {
    // console.log('dashboard RENDER --> userInfo = ', this.props.userInfo);
    if(!this.props.userInfo) {
      this.props.history.push('/');
      return null;
    }

    return (
      <div className="Records" >
        <Header isSignedIn={true} history={this.props.history}/>
        
        <div id="bodyContainer" className="w3-animate-left">
          <div className="h1Size w3-center">Real Time Data</div>
          <div className="w3-center w3-row">
            <div className="w3-container w3-padding-16 h2Size w3-half w3-blue">
              Temperature: <span style={{color:'orangeRed', fontWeight: 'bold'}}>{this.state.temperature} </span>degree
            </div>
            <div className="w3-container w3-padding-16 h2Size w3-half w3-blue">
              Humidity:<span style={{color:'orangeRed', fontWeight: 'bold'}}> {this.state.humidity}</span> %</div>
          </div>
          <br/>
          <div className="h1Size w3-center">History Data</div>
          
          <div className="chartRow">
            <div className="chartCell">
              <AreaChart
                xType={'time'}
                axes
                yDomainRange={[0, 50]}
                grid
                dataPoints
                areaColors={['dodgerBlue', 'forestGreen']}
                width={380}
                height={280}
                interpolate={'cardinal'}
                data={[
                  [
                    { x: '1-May-15', y: 20 },
                    { x: '15-May-15', y: 10 },
                    { x: '1-Jun-15', y: 33 },
                    { x: '7-Jun-15', y: 39 },
                    { x: '22-Jun-15', y: 15 }
                  ], [
                    { x: '1-May-15', y: 10 },
                    { x: '15-May-15', y: 15 },
                    { x: '1-Jun-15', y: 13 },
                    { x: '7-Jun-15', y: 15 },
                    { x: '22-Jun-15', y: 10 }
                  ]
                ]}
              />
            </div>

            <div className="chartCell">
              <AreaChart
                xType={'time'}
                xDomainRange={['29-Apr-15', '1-Jul-15']}
                yDomainRange={[0, 50]}
                axes
                grid
                dataPoints
                areaColors={['dodgerBlue', 'red']}
                width={380}
                height={280}
                data={[
                  [
                    { x: '1-May-15', y: 20 },
                    { x: '15-May-15', y: 10 },
                    { x: '1-Jun-15', y: 33 },
                    { x: '7-Jun-15', y: 39 },
                    { x: '22-Jun-15', y: 15 }
                  ], [
                    { x: '1-May-15', y: 10 },
                    { x: '15-May-15', y: 15 },
                    { x: '1-Jun-15', y: 13 },
                    { x: '7-Jun-15', y: 15 },
                    { x: '22-Jun-15', y: 10 }
                  ]
                ]}
              />
            </div>
          </div>

          <div className="chartRow">
            <div className="chartCell">
              <LineChart
                xType={'time'}
                axes
                yDomainRange={[0, 50]}
                grid
                dataPoints
                lineColors={['dodgerBlue', 'forestGreen']}
                width={380}
                height={280}
                data={[
                  [
                    { x: '1-May-15', y: 20 },
                    { x: '15-May-15', y: 10 },
                    { x: '1-Jun-15', y: 33 },
                    { x: '7-Jun-15', y: 39 },
                    { x: '22-Jun-15', y: 15 }
                  ], [
                    { x: '1-May-15', y: 10 },
                    { x: '15-May-15', y: 15 },
                    { x: '1-Jun-15', y: 13 },
                    { x: '7-Jun-15', y: 15 },
                    { x: '22-Jun-15', y: 10 }
                  ]
                ]}
              />
            </div>
            <div className="chartCell">
              <LineChart
                xType={'time'}
                xDomainRange={['29-Apr-15', '1-Jul-15']}
                yDomainRange={[0, 50]}
                axes
                grid
                dataPoints
                lineColors={['dodgerBlue', 'red']}
                width={380}
                height={280}
                interpolate={'cardinal'}
                data={[
                  [
                    { x: '1-May-15', y: 20 },
                    { x: '15-May-15', y: 10 },
                    { x: '1-Jun-15', y: 33 },
                    { x: '7-Jun-15', y: 39 },
                    { x: '22-Jun-15', y: 15 }
                  ], [
                    { x: '1-May-15', y: 10 },
                    { x: '15-May-15', y: 15 },
                    { x: '1-Jun-15', y: 13 },
                    { x: '7-Jun-15', y: 15 },
                    { x: '22-Jun-15', y: 10 }
                  ]
                ]}
              />
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

export default connect(mapStateToProps)(Records);
