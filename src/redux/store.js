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

function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }catch(e){
        console.log(e);
    }
}
function loadFromLocalStorage(){
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch(e){
        console.log(e)
        return undefined
    }
}
const persistedState = loadFromLocalStorage()
const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25 });
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(...middleware))
);
store.subscribe(()=> saveToLocalStorage(store.getState()))

export default store;
