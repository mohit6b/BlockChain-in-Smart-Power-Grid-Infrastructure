import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from "./reducers";
import NewOrder from "./pages/newOrder";
import SupplyJourney from "./pages/supplyJourney";
import SupplyDetails from "./pages/supplyDetails";

const store = createStore(
  reducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/newOrder/:id" component={NewOrder} />
          <Route path="/supplyDetails/:id" component={SupplyDetails} />
          <Route path="/" component={SupplyJourney} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
