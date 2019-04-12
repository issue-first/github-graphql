import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import issueReducer from "../components/redux/reducers.js";

let reducers = combineReducers({
    data: issueReducer
});

const store = ()=> createStore( reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;