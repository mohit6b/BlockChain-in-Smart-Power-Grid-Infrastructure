import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, Grid, Button, Form } from 'react-bootstrap';
import './Certificate.css';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
import QRCode from 'qrcode.react';
import JSEncrypt from 'jsencrypt';

import Header from '../components/Header';

class Certificate extends Component {

    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: '',
      fileName: '',
    };

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        this.setState({ fileName: file.name });

        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)

      };


    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer});
    };

    onClick = async () => {

    try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        });

        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});
      } 
    catch(error){
        console.log(error);
      } 
  } 

    onSubmit = async (event) => {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);

      //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});

      //save document to IPFS,return its hash#, and set hash# to state
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        this.setState({ ipfsHash:ipfsHash[0].hash });


        storehash.methods.sendHash(this.state.ipfsHash).send({
          from: accounts[0]
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); 
      }) 
    }; 

    render() {
      const thStyle = {
        borderRight: '1px solid grey',
        width: '50%'
      }

      const tdStyle = {
        textOverflow: 'clip'
      }
      
      return (
        <div className="Certificate">
          <Header isSignedIn={true} history={this.props.history}/>
          <div id="certificateTopPanel" className="deepSkyBlueBG w3-padding w3-animate-left">
            <div className="h1Size">Bills Certified with IoTBlockchain</div>
            <div className="h2Size">Powered by IIIT Guwahati</div>
          </div>

          <div>
            <h3> Choose billing file to add </h3>
            <Form onSubmit={this.onSubmit}>
              <div className="w3-row">
                <div className="w3-third w3-padding">
                  <input type="file" name="file" id="file" className="inputfile" onChange = {this.captureFile}/>
                  <label for="file" className="hoverColor">
                    <i className="fa fa-file-text" aria-hidden="true" style={{ fontSize: '80px' }}></i><br/>
                    Choose File
                  </label>
                  <br/>
                  <span id="certificateFileName">{this.state.fileName}</span>
                </div>
                <div className="w3-third  w3-padding">
                  <button type="submit" id="certificateSumitBtn" >
                    <i className="fa fa-paper-plane-o" aria-hidden="true" style={{ fontSize: '80px' }}></i><br/>
                    Send It
                  </button>
                </div>
                <div className="w3-third w3-padding">
                  <QRCode value={`https://gateway.ipfs.io/ipfs/${this.state.ipfsHash}`} /> 
                </div>
              </div>
              

              
            </Form> 
               
          </div>

          <div className="w3-container deepSkyBlueBG">
            <div className="w3-container w3-padding-24">
              <button type="button" className="w3-button w3-orange w3-large w3-round" onClick = {this.onClick}>Get Transaction Receipt</button>
            </div>
            
            <div id="certificateTableBackground">
              <div className="w3-hide-small">
                <table className="w3-table w3-bordered">
                  <tbody>
                    <tr>
                      <th style={thStyle}>Tx Receipt Category</th>
                      <th>Values</th>
                    </tr>
                    <tr>
                      <th style={thStyle} className="w3-text-gray">IPFS Hash # stored on Smart Contract</th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.ipfsHash}</td>
                    </tr>
                    <tr>
                      <th style={thStyle} className="w3-text-gray">Smart Contract Address</th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.ethAddress}</td>
                    </tr>

                    <tr>
                      <th style={thStyle} className="w3-text-gray">Tx Hash # </th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.transactionHash}</td>
                    </tr>

                    <tr>
                      <th style={thStyle} className="w3-text-gray">Block Number # </th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.blockNumber}</td>
                    </tr>

                    <tr>
                      <th style={thStyle} className="w3-text-gray">Gas Used</th>
                      <td className="w3-text-gray" style={tdStyle}>{this.state.gasUsed}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w3-hide-medium w3-hide-large">
                <table className="w3-table w3-bordered">
                  <tbody>
                    <tr><th className="w3-text-dark-gray">IPFS Hash # stored on Smart Contract</th></tr>
                    <tr><td className="w3-text-gray" style={tdStyle}>{this.state.ipfsHash}</td></tr>
                    <tr><th className="w3-text-dark-gray">Smart Contract Address</th></tr>
                    <tr><td className="w3-text-gray" style={tdStyle}>{this.state.ethAddress}</td></tr>
                    <tr><th className="w3-text-dark-gray">Tx Hash # </th></tr>
                    <tr><td className="w3-text-gray" style={tdStyle}>{this.state.transactionHash}</td></tr>
                    <tr><th className="w3-text-dark-gray">Block Number # </th></tr>
                    <tr><td className="w3-text-gray" style={tdStyle}>{this.state.blockNumber}</td></tr>
                    <tr><th className="w3-text-dark-gray">Gas Used</th></tr>
                    <tr><td className="w3-text-gray" style={tdStyle}>{this.state.gasUsed}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <br/><br/>
            
          </div>
        </div>
      );
    } 
}

const mapStateToProps = function(store) {
  // console.log('certificate.js --> mapStateToProps() --> store:', store);
  return {
    userInfo: store.auth.userInfo
  };
}

export default connect(mapStateToProps)(Certificate);
