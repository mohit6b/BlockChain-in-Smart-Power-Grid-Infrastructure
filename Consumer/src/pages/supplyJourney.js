import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card } from 'semantic-ui-react';
import StoreSupply from '../ethereum/storeSupply';
import { storeProducts } from '../actions';

import Layout from '../components/Layout';
import Buyer from '../ethereum/buyer';
import AddEvent from "../ethereum/addEvent";

import './supplyJourney.css'

class SupplyJourney extends Component {
  state = {
    supplyList: [],
  };

  constructor(props) {
    super(props);
    this.interval = setInterval(this.addNotifications, 10000);
    this.addNotifications(true);
  }

  async componentWillMount() {
    const storeSupply = StoreSupply();
    const supplyListCount = await storeSupply.methods.getstoredSupplylistCount().call();
    const supplyList = await Promise.all(
      Array(parseInt(supplyListCount))
        .fill()
        .map((element, index) => {
          return storeSupply.methods.storedSupplyList(index).call();
        }),
    );
    console.log('Supply List : ', supplyList);
    this.props.storeProducts(supplyList);
    this.setState({ supplyList });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
   addNotifications = async(interval) => {
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
    console.log('Order List', orderList);


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

    this.props.storeProducts(filteredProducts);

    if (!interval && newOrders.length > 0 && JSON.stringify(newOrders) !== JSON.stringify(this.props.supplies)) {
      this.setState({ showNotification: false });

    }
  }


  renderSupplyList() {
    const items = this.state.supplyList.map(supply => {
      return {
        header: supply.GridID,
        description: (
          <a
            className="item"
            onClick={() =>
              this.props.history.push(`/supplyDetails/${supply.GridID}`)
            }
          >
            View Supply Tracking
          </a>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout {...this.props}>
        <div id="bodyContainer" className="w3-container">
          <div style={{ textAlign: 'center'}}><h2>Available Supply</h2></div><br/>
          {this.renderSupplyList()}
          <br/><br/>
        </div>

        {this.state.showNotification && (
          <div className="notification-block">
            <h2 className="notification-header">Supply Shipment Details Added</h2>
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



















/*
class CattleJourney extends Component {
  constructor(props) {
    super(props);
    this.interval = setInterval(this.addNotifications, 10000);
    this.addNotifications(true);
  }

  state = {
    cattleList: [],
  };

  async componentWillMount() {
    const cattleAfty = CattleAfty();
    const cattleListCount = await cattleAfty.methods.getCattlelistCount().call();
    const cattleList = await Promise.all(
      Array(parseInt(cattleListCount))
        .fill()
        .map((element, index) => {
          return cattleAfty.methods.cattleList(index).call();
        }),
    );
    console.log('Cattle List', cattleList);
    this.props.storeProducts(cattleList);
    this.setState({ cattleList });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  addNotifications = async (interval) => {
    const buyer = Buyer();
    const trackingDetails = TrackingDetails();

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
    const trackingListCount = await trackingDetails.methods
      .getTrackinglistCount()
      .call();
    const trackingList = await Promise.all(
      Array(parseInt(trackingListCount))
        .fill()
        .map((element, index) => {
          return trackingDetails.methods.trackingList(index).call();
        }),
    );
    console.log('Order List', orderList);
    const newOrders = this.props.products.filter(product => {
      const order = orderList.find(
        order => order.RFID === product.RFID,
      );
      if (!order) return false;
      return product.RFID === order.RFID;
    });
    let filteredProducts = [];

    this.props.products.forEach((item, i) => {
      const olFiltered = orderList.find(
        os => os.RFID === item.RFID,
      );
      const tlFiltered = trackingList.find(
        tl => tl.RFID === item.RFID,
      );
      if (olFiltered) {
        filteredProducts.push({ ...item, ...olFiltered, ...tlFiltered });
      } else {
        filteredProducts.push({ ...item, ...olFiltered, ...tlFiltered });
      }
    });

    this.props.storeProducts(filteredProducts);

    if (!interval && newOrders.length > 0 && JSON.stringify(newOrders) !== JSON.stringify(this.props.products)) {
      this.setState({ showNotification: false });
    }
  }

  renderCattleList() {
    const items = this.state.cattleList.map(cattle => {
      return {
        header: cattle.RFID,
        description: (
          <a
            className="item"
            onClick={() =>
              this.props.history.push(`/productDetails/${cattle.RFID}`)
            }
          >
            View Product Tracking
          </a>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout {...this.props}>
        <div>
          <h3>Cattle Products</h3>
          {this.renderCattleList()}
        </div>
        {this.state.showNotification && (
          <div className="notification-block">
            <h2 className="notification-header">Product Shipment Details Added</h2>
            {this.renderCattleList()}
          </div>
        )}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

export default connect(mapStateToProps, { storeProducts })(CattleJourney);



  renderCattleList() {
    const items = this.state.cattleList.map(cattle => {
      return {
        header: cattle.RFID,
        description: (
          <a
            className="item"
            onClick={() =>
              this.props.history.push(`/productDetails/${cattle.RFID}`)
            }
          >
            View Cattle Journey
          </a>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout {...this.props}>
        <div>
          <h3>Cattle Journey</h3>
          <a
            className="item"
            onClick={() => this.props.history.push(`/newProduct`)}
          >
            <Button
              floated="right"
              content="Add Product"
              icon="add circle"
              primary
            />
          </a>
          {this.renderCattleList()}
        </div>
        {this.state.showNotification && (
          <div className="notification-block">
            <h2 className="notification-header">New Product Ordered</h2>
            {this.renderCattleList()}
          </div>
        )}
      </Layout>
    );
  }
}






import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card } from 'semantic-ui-react';
import CattleAfty from '../ethereum/cattleafty';
import { storeProducts } from '../actions';

import Layout from '../components/Layout';
import Buyer from '../ethereum/buyer';
import TrackingDetails from "../ethereum/trackingDetails";

class ProductJourney extends Component {
  state = {
    productList: [],
  };

  constructor(props) {
    super(props);
    this.interval = setInterval(this.addNotifications, 10000);
    this.addNotifications(true);
  }

  async componentWillMount() {
    const cattleAfty = CattleAfty();
    const cattleListCount = await cattleAfty.methods.getCattlelistCount().call();
    const cattleList = await Promise.all(
      Array(parseInt(cattleListCount))
        .fill()
        .map((element, index) => {
          return cattleAfty.methods.cattleList(index).call();
        }),
    );
    console.log('Cattle List', cattleList);
    this.props.storeProducts(cattleList);
    this.setState({ cattleList });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
   addNotifications = async(interval) => {
    const buyer = Buyer();
    const trackingDetails = TrackingDetails();
    const orderListCount = await Buyer.methods
      .getOrderlistCount()
      .call();
    const trackingListCount = await trackingDetails.methods
      .getTrackinglistCount()
      .call();
    const orderList = await Promise.all(
      Array(parseInt(orderListCount))
        .fill()
        .map((element, index) => {
          return buyer.methods.orderList(index).call();
        }),
    );
    const trackingList = await Promise.all(
      Array(parseInt(trackingListCount))
        .fill()
        .map((element, index) => {
          return trackingDetails.methods.trackingList(index).call();
        }),
    );
    console.log('Order List', orderList);
    const newOrders = this.props.products.filter(product => {
      const order = orderList.find(
        order => order.RFID === product.RFID,
      );
      if (!order) return false;
      return product.RFID === order.RFID;
    });
    let filteredProducts = [];

    this.props.products.forEach((item, i) => {
      const olFiltered = orderList.find(
        os => os.RFID === item.RFID,
      );
      const tlFiltered = trackingList.find(
        tl => tl.RFID === item.RFID,
      );
      if (olFiltered) {
        filteredProducts.push({ ...item, ...olFiltered, ...tlFiltered });
      } else {
        filteredProducts.push({ ...item, ...olFiltered, ...tlFiltered });
      }
    });

    this.props.storeProducts(filteredProducts);

    if (!interval && newOrders.length > 0 && JSON.stringify(newOrders) !== JSON.stringify(this.props.products)) {
      this.setState({ showNotification: false });
    }
  }
  renderCattleList() {
    const items = this.state.cattleList.map(cattle => {
      return {
        header: cattle.RFID,
        description: (
          <a
            className="item"
            onClick={() =>
              this.props.history.push(`/productDetails/${cattle.RFID}`)
            }
          >
            View Product Tracking
          </a>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout {...this.props}>
        <div>
          <h3>Cattle Products</h3>
          {this.renderCattleList()}
        </div>
        {this.state.showNotification && (
          <div className="notification-block">
            <h2 className="notification-header">Product Shipment Details Added</h2>
            {this.renderCattleList()}
          </div>
        )}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

export default connect(mapStateToProps, { storeProducts })(ProductJourney);
*/
