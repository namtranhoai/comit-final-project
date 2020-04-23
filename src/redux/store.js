import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
//import userReducer from './reduxers/userReduxer';
import dataReducer from "./reduxers/dataReduxer";
import uiReducer from "./reduxers/uiReduxer";

import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];

const reducers = combineReducers({
  //    user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25 });
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;
