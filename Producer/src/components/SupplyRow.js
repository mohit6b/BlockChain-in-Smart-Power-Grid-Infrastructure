import React, { Component } from 'react';

class SupplyRow extends Component {
  render() {
    const {
      GridID,
      capacity,
      amountStored,
      rate,
      location,
      eventID,
      deviceID,
      deviceName,
      amountTransferred,
      eventstartTime,
      eventendTime,
      quantity,
      purchaseDate,
      associatedAmount,
    } = this.props;

    return (
      <tr>
        <td>
        { !amountTransferred && (
            <div title="Add Event!" className="pointer w3-text-blue" onClick={() => this.props.history.push(`/transferEvent/${GridID}`)}>
              <i class="fa fa-cloud-upload" aria-hidden="true" style={{fontSize: '30px'}}></i>
            </div>
        )}
        { amountTransferred && (
            <div className="w3-text-green">
              <i class="fa fa-check-square-o" aria-hidden="true" style={{fontSize: '30px'}}></i>
            </div>
        )}

        </td>
        <td>{GridID}</td>
        <td>{capacity}</td>
        <td>{amountStored}</td>
        <td>{rate}</td>
        <td>{location}</td>
	      <td>{!amountTransferred ? '' : eventID}</td>
        <td>{!amountTransferred ? '' : deviceID}</td>
        <td>{deviceName}</td>
        <td>{amountTransferred}</td>
        <td>{eventstartTime}</td>
        <td>{eventendTime}</td>
	      <td>{!quantity ? '' : quantity}</td>
        <td>{purchaseDate}</td>
        <td>{parseFloat(rate)*parseFloat(amountTransferred)}</td>
        
      </tr>
    );
  }
}

export default SupplyRow;
