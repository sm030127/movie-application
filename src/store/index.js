import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reduxLogger from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [thunk, promiseMiddleware, reduxLogger];
const initStore = createStore(rootReducer, applyMiddleware(...middlewares));

export default initStore;
