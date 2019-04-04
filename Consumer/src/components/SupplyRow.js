import React, { Component } from 'react';

class SupplyRow extends Component {
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
      <tr>
        <td>
        { !quantity && (
            <div title="Place this Order" className="pointer w3-text-blue" onClick={() => this.props.history.push(`/newOrder/${orderID}`)}>
              <i class="material-icons" style={{fontSize: '30px'}}>add_shopping_cart</i>
            </div>
        )}
        { quantity && (
            <div className="w3-text-green">
              <i class="fa fa-check-square-o" aria-hidden="true" style={{fontSize: '30px'}}></i>
            </div>
        )}
        </td>
        <td>{GridID}</td>
        <td>{amountStored}</td>
        <td>{rate}</td>
        <td>{location}</td>
	      <td>{!quantity ? '' : orderID}</td>
	      <td>{!quantity ? '' : quantity}</td>
        <td>{purchaseDate}</td>
	      <td>{!amountTransferred ? '' : eventID}</td>
        <td>{!amountTransferred ? '' : deviceID}</td>
        <td>{deviceName}</td>
        <td>{amountTransferred}</td>
        <td>{eventstartTime}</td>
        <td>{eventendTime}</td>
        <td>{parseFloat(rate)*parseFloat(amountTransferred)}</td>
      </tr>
    );
  }
}

export default SupplyRow;
