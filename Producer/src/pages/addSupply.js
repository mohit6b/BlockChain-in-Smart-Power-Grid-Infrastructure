import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import StoreSupply from "../ethereum/storeSupply";

class AddSupply extends Component {
  state = {
    loading: false,
    amountStored: '',
    capacity: '',
    rate: '',
    location: '',
    startTime: '',
    endTime: '',
    errorMessage: '',
    transactionHash: '',
  };

  onSubmit = async () => {
    this.setState({ loading: true, errorMessage: '' });
    const ddMM = String(this.state.startTime).split('-');
    const dest = this.state.location.substring(0,3).toUpperCase();
    const type = "GRD";
    const GridID = `${ddMM[2]}${ddMM[1]}${ddMM[0].substring(2,4)}-${type}-${dest}`;
    console.log('GridID : ', GridID);

    try {
      const accounts = await web3.eth.getAccounts();
      const storeSupply = StoreSupply();
      const { amountStored, capacity, rate, location,  startTime, endTime } = this.state;
      await storeSupply.methods.addStorage(amountStored, capacity, rate, location, startTime, endTime, GridID).send({
        from: accounts[0],
        gas: '1000000'
      },(err, res) => this.setState({ transactionHash: res }));
    } catch (err) {
      this.setState({ errorMessage: err.message.split('\n')[0] });
    }
    this.setState({ loading: false, errorMessage: '' });

  };

  render() {
    return (
      <Layout {...this.props}>
        <div style={{ textAlign: 'center'}}><h2>Enter Details</h2></div><br/>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

          <Form.Field>
            <label className="w3-large">Amount Stored</label>
            <Input className="w3-large"
              label="Amount Stored ( in MW )"
              labelPosition="right"
              onChange={event =>
                this.setState({ amountStored: event.target.value })
              }
            />
          </Form.Field>


          <Form.Field>
            <label className="w3-large">Capacity</label>
            <Input className="w3-large"
              label="in Mega Watts"
              labelPosition="right"
              onChange={event =>
                this.setState({ capacity: event.target.value })
              }
            />
          </Form.Field>


          <Form.Field>
            <label className="w3-large">Rate</label>
            <Input className="w3-large"
              label="Rate(Rupees/KW)"
              labelPosition="right"
              onChange={event =>
                this.setState({ rate: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label className="w3-large">Location</label>
            <Input className="w3-large"
              label="Grid Location"
              labelPosition="right"
              onChange={event =>
                this.setState({ location: event.target.value })
              }
            />
          </Form.Field>


          <Form.Field>
            <label className="w3-large">Storage start Time</label>
            <input className="w3-large"
              type="Date"
              label="Starting Time"
              labelPosition="right"
              onChange={event =>
                this.setState({ startTime: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label className="w3-large">Storage End Time</label>
            <input className="w3-large"
              type="Date"
              label="Ending Time"
              labelPosition="right"
              onChange={event =>
                this.setState({ endTime: event.target.value })
              }
            />
          </Form.Field>

          <div style={{ textAlign: 'center', padding: '5px'}}>
            <Button  className="w3-large" loading={this.state.loading} primary>Add Storage!</Button>
            <button type="button" id="cancelBtn" className="w3-button w3-large w3-orange w3-round"
              style={{width: '120px', height:'45px', position: 'relative', bottom: '3px', marginLeft: '5px'}}
              onClick={() => this.props.history.push('/')}>Cancel</button>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <br/><br/>
          </div>
          
          
          
          {this.state.transactionHash !== '' && (
            <Message content={this.state.transactionHash}></Message>
          )}
        </Form>
      </Layout>
    );
  }
}

export default AddSupply;
