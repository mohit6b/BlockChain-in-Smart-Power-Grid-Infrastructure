import React, { Component } from 'react';

class SupplyRecordTable extends Component {
  render() {
    const {
      GridID,
      amountStored,
      rate,
      location,
      orderID,
      quantity,
      purchaseDate,
      eventID,
      deviceID,
      deviceName,
      amountTransferred,
      eventstartTime,
      eventendTime,
      associatedAmount,
    } = this.props;

    return (
      <div>
        <table className="w3-table w3-bordered">
          <tr><td className="columnHeader">Purchase Order</td>
            <td>
              { !quantity && (
                <div title="Place this Order" className="pointer w3-text-blue" onClick={() => this.props.history.push(`/newOrder/${GridID}`)}>
                  <i class="material-icons" style={{fontSize: '30px'}}>add_shopping_cart</i>
                </div>
              )}
              { quantity && (
                <div className="w3-text-green">
                  <i class="fa fa-check-square-o" aria-hidden="true" style={{fontSize: '30px'}}></i>
                </div>
              )}

            </td></tr>
          <tr><td className="columnHeader">Grid Event Number</td><td>{GridID}</td></tr>
          <tr><td className="columnHeader">Available Amount (MW)</td><td>{amountStored}</td></tr>
          <tr><td className="columnHeader">Rate (per KW)</td><td>{rate}</td></tr>
          <tr><td className="columnHeader">Grid Location</td><td>{location}</td></tr>
          <tr><td className="columnHeader">Order Number</td><td>{!quantity ? '' : orderID}</td></tr>
          <tr><td className="columnHeader">Purchase Quantity</td><td>{!quantity ? '' : quantity}</td></tr>
          <tr><td className="columnHeader">Purchase Date</td><td>{purchaseDate}</td></tr>
          <tr><td className="columnHeader">Transfer Event</td><td>{!amountTransferred ? '' : eventID}</td></tr>
          <tr><td className="columnHeader">Recipient Device</td><td>{!amountTransferred ? '' : deviceID}</td></tr>
          <tr><td className="columnHeader">Transfer Amount (KW)</td><td>{amountTransferred}</td></tr>
          <tr><td className="columnHeader">Transfer Start Time</td><td>{eventstartTime}</td></tr>
          <tr><td className="columnHeader">Transfer End Time</td><td>{eventendTime}</td></tr>
          <tr><td className="columnHeader">Cost Associated</td><td>{parseFloat(rate)*parseFloat(amountTransferred)}</td></tr>
        </table>
        <div style={{ backgroundColor: 'white'}}>&nbsp;</div>
      </div>
    );
  }
}

export default SupplyRecordTable;
