import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import SupplyRow from '../components/SupplyRow';
import SupplyRecordTable from '../components/SupplyRecordTable';
import { storeProducts } from '../actions';

import './supplyDetail.css'

class SupplyDetails extends Component {
  renderRows(supplyDetails) {
    return supplyDetails.map((supplyDetails, index) => (
      <SupplyRow
        GridID={supplyDetails.GridID}
        capacity={supplyDetails.capacity}
        amountStored={supplyDetails.amountStored}
        rate={supplyDetails.rate}
        location={supplyDetails.location}
        orderID={supplyDetails.orderID}
        quantity={supplyDetails.quantity}
        purchaseDate={supplyDetails.purchaseDate}
        eventID={supplyDetails.eventID}
        deviceID={supplyDetails.deviceID}
        deviceName={supplyDetails.deviceName}
        amountTransferred={supplyDetails.amountTransferred}
        eventstartTime={supplyDetails.eventstartTime}
        eventendTime={supplyDetails.eventendTime}
        associatedAmount={supplyDetails.rate*supplyDetails.amountTransferred}
        history={this.props.history}
      />
    ));
  }

  renderRecordTables(supplyDetails) {
    return supplyDetails.map((supplyDetails, index) => (
      <SupplyRecordTable
        key={index}
        GridID={supplyDetails.GridID}
        capacity={supplyDetails.capacity}
        amountStored={supplyDetails.amountStored}
        rate={supplyDetails.rate}
        location={supplyDetails.location}
        orderID={supplyDetails.orderID}
        quantity={supplyDetails.quantity}
        purchaseDate={supplyDetails.purchaseDate}
        eventID={supplyDetails.eventID}
        deviceID={supplyDetails.deviceID}
        deviceName={supplyDetails.deviceName}
        amountTransferred={supplyDetails.amountTransferred}
        eventstartTime={supplyDetails.eventstartTime}
        eventendTime={supplyDetails.eventendTime}
        associatedAmount={supplyDetails.rate*supplyDetails.amountTransferred}
        history={this.props.history}
      />
    ));
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    const { supplies } = this.props;
    const supplyDetails =
      this.props.match.params.id === 'all'
        ? supplies
        : supplies.filter(
            supply => supply.GridID === this.props.match.params.id,
          );
    return (
      <Layout {...this.props}>
        <div id="titleContainer"><center><h2 style={{ marginTop: '5px' }}>Supply Tracking</h2></center><br/></div>
        <div id="bodyContainerLarge" className="w3-container">   
          <table className="w3-table w3-bordered">
            <tr className="columnHeader">
              <td>Purchase Order</td>

              <td>GridID</td>
              <td>Grid Capacity(MW)</td>
              <td>Available Storage(MW)</td>
              <td>Rate (per KW)</td>
              <td>Grid Location</td>
                <td>Order Number</td>
                <td>Purchase Quantity</td>
                <td>Purchase Date</td>
                <td>Event ID</td>
                <td>Device ID</td>
                <td>Device Name</td>
                <td>Transfer Amount</td>
                <td>Transfer Start Time</td>
                <td>Transfer End Time</td>
                <td>Associated Cost</td>

            </tr>
            {this.renderRows(supplyDetails)}
          </table>
        </div>

        <div id="bodyContainerSmall">{this.renderRecordTables(supplyDetails)}</div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { supplies: state.supplies };
}

export default connect(mapStateToProps, { storeProducts })(SupplyDetails);
