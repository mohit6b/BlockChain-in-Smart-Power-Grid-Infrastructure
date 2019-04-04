import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';
import jsPDF from 'jspdf';


class SupplyRecordTable extends Component {
  constructor(){
    super();
    this.state = {
      nama:'',
      pesan:'',
      tinggi:11.69,
      lebar:'08.27',
      judul:'Lintang.pdf',
      GridID:'131118-GRD-DEL',
      capacity:'200',
      amountStored:'100',
      rate:'6',
      location:'Delhi',
      eventID:'131-EVNT-DEL',
      deviceID:'DVC-131-SM',
      amountTransferred:'100',
      eventstartTime:'2018-11-28 14:15',
      eventendTime:'2018-11-28 17:08',
      quantity:'100',
      purchaseDate:'2018-11-28',
      associatedAmount:'600',
    }
  }

  unduhPdf(e){
    e.preventDefault();

    var doc = new jsPDF({
      // orientation: 'landscape',
      unit: 'in',
      // format: [4, 2]  // tinggi, lebar
      format: [this.state.tinggi, this.state.lebar]
    })
    doc.text(`Recipient: ${this.state.nama}`, 0.5, 1.1)
    doc.text(`Message: ${this.state.pesan}`, 0.5, 1.4)
    // format: (image_file, 'image_type', X_init, Y_init, X_fin, Y_fin)

    doc.text(`Grid Number: ${this.state.GridID}`, 0.5, 2.0)
    doc.text(`Grid Capacity(in MW): ${this.state.capacity}`, 0.5, 2.3)
    doc.text(`Rate in Rupees/KW: ${this.state.rate}`, 0.5, 2.6)
    doc.text(`Grid Location: ${this.state.location}`, 0.5, 2.9)
    doc.text(`Event Number: ${this.state.eventID}`, 0.5, 3.2)
    doc.text(`Device Number: ${this.state.deviceID}`, 0.5, 3.5)
    doc.text(`Amount Transeferred(in KW): ${this.state.amountTransferred}`, 0.5, 3.8)
    doc.text(`Event Starting Time: ${this.state.eventstartTime}`, 0.5, 4.1)
    doc.text(`Event Ending Time: ${this.state.eventendTime}`, 0.5, 4.4)
    doc.text(`Purchased Quantity: ${this.state.quantity}`, 0.5, 4.7)
    doc.text(`Purchased Date: ${this.state.purchaseDate}`, 0.5, 5.0)
    doc.text(`Amount Associated: ${this.state.associatedAmount}`, 0.5, 5.4)

    doc.text(`PDF filename: ${this.state.judul}`, 0.5, 7.5)
    doc.text(`PDF size: ${this.state.tinggi} x ${this.state.lebar} in`, 0.5, 7.8)

    doc.save(`${this.state.judul}`)
  };


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
      <div>
        <table className="w3-table w3-bordered">
          <tr><td className="columnHeader">Add Event</td>
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
            </td></tr>

          <tr><td className="columnHeader">GridID</td><td>{GridID}</td></tr>
          <tr><td className="columnHeader">Capacity (MW)</td><td>{capacity}</td></tr>
          <tr><td className="columnHeader">Available Amount (MW)</td><td>{amountStored}</td></tr>
          <tr><td className="columnHeader">Rate (per KW)</td><td>{rate}</td></tr>
          <tr><td className="columnHeader">Grid Location</td><td>{location}</td></tr>
          <tr><td className="columnHeader">Event ID</td><td>{!amountTransferred ? '' : eventID}</td></tr>
          <tr><td className="columnHeader">Recipient Device</td><td>{!amountTransferred ? '' : deviceID}</td></tr>
          <tr><td className="columnHeader">Transfer Amount (KW)</td><td>{amountTransferred}</td></tr>
          <tr><td className="columnHeader">Transfer Start Time</td><td>{eventstartTime}</td></tr>
          <tr><td className="columnHeader">Transfer End Time</td><td>{eventendTime}</td></tr>
          <tr><td className="columnHeader">Purchase Quantity</td><td>{!quantity ? '' : quantity}</td></tr>
          <tr><td className="columnHeader">Purchase Date</td><td>{purchaseDate}</td></tr>
          <tr><td className="columnHeader">Cost Associated</td><td>{parseFloat(rate)*parseFloat(amountTransferred)}</td></tr>
        </table>

          <div style={{ textAlign: 'center', padding: '5px'}}>
<br/>
<br/>

      <p style={{width:'100%'}}>Select PDF Size: &nbsp;
        <select ref="ukuran"
        onChange={(x)=>this.setState({
          tinggi: x.target.value[0]+x.target.value[1]+x.target.value[2]+x.target.value[3]+x.target.value[4],
          lebar: x.target.value[6]+x.target.value[7]+x.target.value[8]+x.target.value[9]+x.target.value[10]
        })}>
          <option value={[11.69,'08.27']}> A4 (210mm x 297mm) </option>
          <option value={[46.81,33.11]}> A0 (841mm x 1189mm) </option>
          <option value={[33.11,23.39]}> A1 (594mm x 841mm) </option>
          <option value={[23.39,16.54]}> A2 (420mm x 594mm) </option>
          <option value={[16.54,11.69]}> A3 (297mm x 420mm) </option>
          <option value={['08.27','05.83']}> A5 (148mm x 210mm) </option>
          <option value={['05.83','04.13']}> A6 (105mm x 148mm) </option>
          <option value={['04.13','02.91']}> A7 (74mm x 105mm) </option>
          <option value={['02.91','02.05']}> A8 (52mm x 74mm) </option>
          <option value={['02.05','01.46']}> A9 (37mm x 52mm) </option>
          <option value={['01.46','01.02']}> A10 (26mm x 37mm) </option>
        </select>
        </p>

        <span style={{width:'100%'}}>
            <p>PDF Filename:
            <Input type="text" size="30" style={{width:'100%'}}
            placeholder="Input pdf filename that will be downloaded..."
            onChange={(x)=>this.setState({judul: x.target.value+'.pdf'})} />
            </p>
        </span>
        
        <span style={{width:'100%'}}>
            <p>Recipient:
            <Input type="text" size="30" style={{width:'100%'}}
            placeholder="Type the recipient here..."
            onChange={(x)=>this.setState({nama: x.target.value})} />
            </p>
        </span>

        <span style={{width:'100%'}}>
            <p>Message:
            <Input id="pesan" type="text" size="30" style={{width:'100%'}}
            placeholder="Type your messages here..."
            onChange={(x)=>this.setState({pesan: x.target.value})}/>
            </p>
        </span>
        
        <Button className="w3-large" primary onClick={this.unduhPdf.bind(this)}
        variant="raised" color="" style={{margin:'5px'}}>
          Generate Bill!
        </Button>

	  </div>

        <div style={{ backgroundColor: 'white'}}>&nbsp;</div>
      </div>
    );
  }
}

export default SupplyRecordTable;
