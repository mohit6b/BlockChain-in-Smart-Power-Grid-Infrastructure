import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import AddEvent from '../ethereum/addEvent';

class TransferEvent extends Component {
  state = {
    loading: false,
    eventstartTime: '',
    eventendTime: '',
    amountTransferred: '',
    deviceName: '',
    errorMessage: '',
    transactionHash: '',
  };

  onSubmit = async () => {
    this.setState({ loading: true, errorMessage: '' });
    const { supplies } = this.props;
    const supply =
      this.props.match.params.id === 'all'
        ? supplies
        : supplies.find(
        supply => supply.GridID === this.props.match.params.id,
        );


    try {
      const accounts = await web3.eth.getAccounts();
      const addevent = AddEvent();
      const {
	amountTransferred,
        deviceName,
        startTime,
        startDate,
        endTime,
        endDate,
      } = this.state;
      const eventstartTime = startDate + ' ' + startTime ;
      const eventendTime = endDate + ' ' +  endTime ;

    const gridId = supply.GridID;
    const ddMM = String(gridId).split('-');
    const dest = this.state.deviceName.substring(0,2).toUpperCase();
    const type = "DVC";
    const deviceID = `${type}-${ddMM[0].substring(0,3)}-${dest}`;
    console.log('DeviceID : ', deviceID);


    const type1 = "EVNT";
    const eventID = `${ddMM[0].substring(0,3)}-${type1}-${ddMM[2]}`;
    console.log('EventID : ', eventID);



      await addevent.methods
        .createEvent(
		eventstartTime,
		eventendTime,
        	amountTransferred,
		deviceName,
		supply.GridID,
		eventID,
		deviceID
        )
        .send(
          {
            from: accounts[0],
            gas: '1000000',
          },
          (err, res) => this.setState({ transactionHash: res }),
        );
    } catch (err) {
      this.setState({
        errorMessage: err.message.split('\n')[0],
        loading: false,
      });
      return;
    }
    this.setState({ loading: false, errorMessage: '' });
  };

  render() {
    const { supplies } = this.props;
    const supply =
      this.props.match.params.id === 'all'
        ? supplies
        : supplies.find(
            supply => supply.GridID === this.props.match.params.id,
          );
    return (
      <Layout {...this.props}>
        <div style={{ textAlign: 'center'}}><h2>Add Transfer Event</h2><br/></div>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <Form.Field>
              <label className="w3-large">Grid ID</label>
              {supply && <label>{supply.GridID}</label>}

            </Form.Field>

            <label className="w3-large">Event Start Time </label>
            <div>
            <div>
            <input className="w3-large"
              type="Time"
              onChange={event =>
                  this.setState({ startTime: event.target.value})              }
            />
            </div>

            <div>
            <input className="w3-large"
              type="Date"
              onChange={event =>
                this.setState({ startDate: event.target.value})
              }
            />
            </div>
            </div>
          </Form.Field>


            <Form.Field>
            <label className="w3-large">Event End Time </label>
            <div>
            <div>
            <input className="w3-large"
              type="Time"
              onChange={event =>
                  this.setState({ endTime: event.target.value})              }
            />
            </div>

            <div>
            <input className="w3-large"
              type="Date"
              onChange={event =>
                this.setState({ endDate: event.target.value})
              }
            />
            </div>
            </div>
          </Form.Field>


          <Form.Field>
            <label className="w3-large">Transfering Amount</label>
            <Input className="w3-large"
              label="Amount (in KW)"
              labelPosition="right"
              onChange={event =>
                this.setState({ amountTransferred: event.target.value })
              }
            />
          </Form.Field>


          <Form.Field>
            <label className="w3-large">Device Name</label>
            <Input className="w3-large"
              label="Recipient Device"
              labelPosition="right"
              onChange={event =>
                this.setState({ deviceName: event.target.value })
              }
            />
          </Form.Field>



          <div style={{ textAlign: 'center'}}><h2>Add Transfer Event</h2><br/>
            <Button className="w3-large" loading={this.state.loading} primary>Add!</Button>
            <button type="button" id="cancelBtn" className="w3-button w3-large w3-orange w3-round"
              style={{width: '90px', height:'45px', position: 'relative', bottom: '3px', marginLeft: '5px'}}
              onClick={() => this.props.history.push('/supplyDetails/all')}>Cancel</button>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <br/><br/>
          </div>
          
          
          {this.state.transactionHash !== '' && (
            <Message content={this.state.transactionHash} />
          )}
        </Form>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { supplies: state.supplies };
}

export default connect(mapStateToProps, null)(TransferEvent);
