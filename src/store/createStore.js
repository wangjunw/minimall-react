import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
const middlewares  = [thunk];

let store = createStore(reducers, compose(applyMiddleware(...middlewares)));
export default store;
