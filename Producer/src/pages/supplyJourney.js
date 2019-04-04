import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoreSupply from '../ethereum/storeSupply';
import Buyer from '../ethereum/buyer';
import AddEvent from "../ethereum/addEvent";
import { storeProducts } from '../actions';

import Layout from '../components/Layout';

import './supplyJourney.css'

class SupplyJourney extends Component {
  constructor(props) {
    super(props);
    this.interval = setInterval(this.addNotifications, 10000);
    this.addNotifications(true);
  }

  state = {
    supplyList: [],
    filteredProducts: [],
  };

  async componentWillMount() {
    const storeSupply = StoreSupply();
    const supplyListCount = await storeSupply.methods.getstoredSupplylistCount().call();
    console.log("Added Supply count = ", supplyListCount);
    const supplyList = await Promise.all(
      Array(parseInt(supplyListCount))
        .fill()
        .map((element, index) => {
          return storeSupply.methods.storedSupplyList(index).call();
        }),
    );
    console.log('Stored Supply List : ', supplyList);

    this.props.storeProducts(supplyList);
    this.setState({ supplyList });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  addNotifications = async (interval) => {
    const buyer = Buyer();
    const orderListCount = await buyer.methods
      .getOrderlistCount()
      .call();
    const orderList = await Promise.all(
      Array(parseInt(orderListCount))
        .fill()
        .map((element, index) => {
          return buyer.methods.orderList(index).call();
        }),
    );

    console.log('Order List : ', orderList);


    const addevent = AddEvent();
    const eventListCount = await addevent.methods
      .getEventCount()
      .call();
    const eventList = await Promise.all(
      Array(parseInt(eventListCount))
        .fill()
        .map((element, index) => {
          return addevent.methods.eventList(index).call();
        }),
    );

    console.log('Event List : ', eventList);

    const newOrders = this.props.supplies.filter(supply => {
      const order = orderList.find(
        order => order.GridID === supply.GridID,
      );
      if (!order) return false;
      return supply.GridID === order.GridID;
    });
    let filteredProducts = [];

    this.props.supplies.forEach((item, i) => {
      const olFiltered = orderList.find(
        os => os.GridID === item.GridID,
      );
      const tlFiltered = eventList.find(
        tl => tl.GridID === item.GridID,
      );
      if (olFiltered) {
        filteredProducts.push({ ...item, ...olFiltered, ...tlFiltered });
      } else {
        filteredProducts.push({ ...item, ...olFiltered, ...tlFiltered });
      }
    });

    this.setState({ filteredProducts });
    this.props.storeProducts(filteredProducts);

    if (!interval && newOrders.length > 0 && JSON.stringify(newOrders) !== JSON.stringify(this.props.supplies)) {
      this.setState({ showNotification: false });

    }
  }

  renderSupplyList() {
    return this.state.filteredProducts.map(supply => {
      return (
        <tr>
          <td>
            <div className="w3-row">
              <div title="View Stored Supply" className="w3-half w3-large pointer" 
                style={{width: '180px',height: '30px', lineHeight: '30px', margin: '10px'}}
                onClick={() => this.props.history.push(`/supplyDetails/${supply.GridID}`) }>{ supply.GridID }</div> 
              <div className="w3-half" style={{display: 'flex', margin: '10px'}} >
                <div className="w3-text-blue">
                  <i className="fa fa-cube" aria-hidden="true" style={{fontSize: '25px'}}></i>
                </div>
                
                {supply.amountTransferred && supply.eventID && (
                  <div title="Tracked" className="w3-text-green" >
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>&nbsp;
                    <i className="fa fa-cube" aria-hidden="true" style={{fontSize: '25px'}}></i>
                  </div>
                )}
                
                
                {supply.quantity && (
                  <div title="Ordered" className="w3-text-orange" >
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>&nbsp;
                    <i className="fa fa-cube" aria-hidden="true" style={{fontSize: '25px'}}></i>
                  </div>
                )}
                
              </div> 
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Layout {...this.props}>
        <div id="titleContainer"><center><h2 style={{ marginTop: '5px' }}>Stored Supply</h2></center><br/></div>
        <div id="newProductBtn" className="pointer"
            onClick={() => this.props.history.push(`/addSupply`)} >
            <div><i className="fa fa-plus-square" aria-hidden="true" style={{fontSize: '40px'}}></i></div>
            <div className="w3-xlarge" style={{height: '35px', lineHeight: '25px', margin: '10px'}}>Add A New Storage</div>
        </div>
        <div id="bodyContainer" className="w3-container">
          <table className="w3-table w3-bordered">
            {this.renderSupplyList()}
          </table>
          <br/><br/>
        </div>
        {this.state.showNotification && (
          <div className="notification-block">
            <h2 className="notification-header">New Supply Stored</h2>
            {this.renderSupplyList()}
          </div>
        )}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { supplies: state.supplies };
}

export default connect(mapStateToProps, { storeProducts })(SupplyJourney);
