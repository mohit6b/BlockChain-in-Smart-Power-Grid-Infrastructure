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
        key={index}
        GridID={supplyDetails.GridID}
        capacity={supplyDetails.capacity}
        amountStored={supplyDetails.amountStored}
        rate={supplyDetails.rate}
        location={supplyDetails.location}
        eventID={supplyDetails.eventID}
        deviceID={supplyDetails.deviceID}
        deviceName={supplyDetails.deviceName}
        amountTransferred={supplyDetails.amountTransferred}
        eventstartTime={supplyDetails.eventstartTime}
        eventendTime={supplyDetails.eventendTime}
        quantity={supplyDetails.quantity}
        purchaseDate={supplyDetails.purchaseDate}
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
        eventID={supplyDetails.eventID}
        deviceID={supplyDetails.deviceID}
        deviceName={supplyDetails.deviceName}
        amountTransferred={supplyDetails.amountTransferred}
        eventstartTime={supplyDetails.eventstartTime}
        eventendTime={supplyDetails.eventendTime}
        quantity={supplyDetails.quantity}
        purchaseDate={supplyDetails.purchaseDate}
        associatedAmount={supplyDetails.rate*supplyDetails.amountTransferred}
        history={this.props.history}
      />
    ));
  }

  render() {
    const { supplies } = this.props;
    const supplyDetails =
      this.props.match.params.id === 'all'
        ? supplies
        : supplies.filter(
            supply => supply.RFID === this.props.match.params.id,
          );
    return (
      <Layout {...this.props}>
        <div id="titleContainer"><center><h2 style={{ marginTop: '5px' }}>Supply Details</h2></center><br/></div>
        <div id="bodyContainerLarge" className="w3-container">   
          <table className="w3-table w3-bordered">
            <tr className="columnHeader">
              <td>Add Event</td>

              <td>GridID</td>
              <td>Grid Capacity(MW)</td>
              <td>Available Storage(MW)</td>
              <td>Rate (per KW)</td>
              <td>Grid Location</td>
              {supplyDetails.length > 0 && supplyDetails[0].eventID && (
                <td>Event ID</td>
              )}
              {supplyDetails.length > 0 && supplyDetails[0].deviceID && (
                <td>Device ID</td>
              )}
              {supplyDetails.length > 0 && supplyDetails[0].deviceName && (
                <td>Device Name</td>
              )}
              {supplyDetails.length > 0 && supplyDetails[0].amountTransferred && (
                <td>Transfer Amount</td>
              )}
              {supplyDetails.length > 0 && supplyDetails[0].eventstartTime && (
                <td>Transfer Start Time</td>
              )}
              {supplyDetails.length > 0 && supplyDetails[0].eventendTime && (
                <td>Transfer End Time</td>
              )}
              {supplyDetails.length > 0 && supplyDetails[0].quantity && (
                <td>Purchase Quantity</td>
              )}
              {supplyDetails.length > 0 && supplyDetails[0].quantity && (
                <td>Purchase Date</td>
              )}
              {supplyDetails.length > 0 && supplyDetails[0].quantity && (
                <td>Associated Cost</td>
              )}
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
