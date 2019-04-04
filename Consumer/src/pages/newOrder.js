import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import Buyer from '../ethereum/buyer';
import { storeProducts } from '../actions';

class NewOrder extends Component {
  state = {
    loading: false,
    amountStored: '',
    rate: '',
    location: '',
    quantity: '',
    deviceName: '',
    purchaseDate: '',
    orderID: '',
    deviceID: '',
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

    const gridId = supply.GridID;
    const ddMM = String(gridId).split('-');
    const dest = this.state.deviceName.substring(0,3).toUpperCase();
    const type = "DVC";
    const deviceID = `${type}-${ddMM[0].substring(0,3)}-${dest}`;
    console.log('DeviceID : ', deviceID);

    const ddM = String(this.state.purchaseDate).split('-');
    const type1 = "ORD";
    const orderID = `${type1}-${ddM[2]}${ddM[1]}${ddM[0].substring(2,4)}-${dest}`;
    console.log('Order Number : ', orderID);




    try {
      const accounts = await web3.eth.getAccounts();
      const buyer = Buyer();
      const { quantity, deviceName, purchaseDate } = this.state;
      await buyer.methods
        .requestSupply(
          quantity,
          deviceName,
          purchaseDate,
          orderID,
          deviceID,
          supply.GridID
        )
        .send(
          {
            from: accounts[0],
            gas: '2000000',
          },
          (err, res) => this.setState({ transactionHash: res }),
        );
    } catch (err) {
      this.setState({ errorMessage: err.message.split('\n')[0] });
    }
    this.setState({ loading: false, errorMessage: '' });
  };

  render() {
    const { supplies } = this.props;
    const supplyDetails =
      this.props.match.params.id === 'all'
        ? supplies
        : supplies.filter(
            supply => supply.GridID === this.props.match.params.id,
          );
    return (
      <Layout {...this.props}>
        <div style={{ textAlign: 'center' }}><h2>Purchase Power</h2></div>
        {supplyDetails.length > 0 && (
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label className="w3-large">Grid Number</label>
              <label className="w3-large w3-text-gray">{supplyDetails[0].GridID}</label>
            </Form.Field>

            <Form.Field>
              <label className="w3-large">Available Amount</label>
              <label className="w3-large w3-text-gray">{supplyDetails[0].amountStored}</label>
            </Form.Field>

            <Form.Field>
              <label className="w3-large">Rate (Rupees/KW)</label>
              <label className="w3-large w3-text-gray">{supplyDetails[0].rate}</label>
            </Form.Field>

            <Form.Field>
              <label className="w3-large">Grid Location</label>
              <label className="w3-large w3-text-gray">{supplyDetails[0].location}</label>
            </Form.Field>


            <Form.Field>
              <label className="w3-large">Purchase Quantity (KW)</label>
              <Input className="w3-large"
                label="Quantity(KW)"
                labelPosition="right"
                onChange={event =>
                  this.setState({ quantity: event.target.value })
                }
              />
            </Form.Field>

            <Form.Field>
              <label className="w3-large">Device Name</label>
              <Input className="w3-large"
                label="Type of Device"
                labelPosition="right"
                onChange={event =>
                  this.setState({ deviceName: event.target.value })
                }
              />
            </Form.Field>


            <Form.Field>
              <label className="w3-large">Purchase Date</label>
              <input className="w3-large"
		            type="Date"
                label="Date"
                labelPosition="right"
                onChange={event =>
                  this.setState({ purchaseDate: event.target.value })
                }
              />
            </Form.Field>
            <div style={{ textAlign: 'center', padding: '5px'}}>
              <Button loading={this.state.loading} primary>Request Supply!</Button>
              <button type="button" id="cancelBtn" className="w3-button w3-orange w3-round"
                style={{width: '85px', height:'35px', position: 'relative', bottom: '3px', marginLeft: '5px', fontWeight: 'bold'}}
                onClick={() => this.props.history.push('/supplyDetails/all')}>Cancel</button>

              <Message error header="Oops!" content={this.state.errorMessage} />
              {this.state.transactionHash !== '' && (
                <Message content={this.state.transactionHash} />
              )}
            </div>
          </Form>
        )}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { supplies: state.supplies };
}

export default connect(mapStateToProps, { storeProducts })(NewOrder);
