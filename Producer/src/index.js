import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from "./reducers";
import AddSupply from "./pages/addSupply";
import TransferEvent from "./pages/transferEvent";
import SupplyJourney from "./pages/supplyJourney";
import SupplyDetails from "./pages/supplyDetails";


const initialState = {
    count:0
}

function reducer(state=initialState, action){
    switch(action.type){
        case 'INCREMENT':
        return{count: state.count + 1};
        case 'DECREMENT':
        return{count: state.count - 1};
        default:return state
    }

}


const store = createStore(
   reducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/addSupply" component={AddSupply} />
          <Route path="/supplyDetails/:id" component={SupplyDetails} />
          <Route path="/transferEvent/:id" component={TransferEvent} />
          <Route path="/" component={SupplyJourney} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
