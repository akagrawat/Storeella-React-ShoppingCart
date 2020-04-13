import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { logger } from 'redux-logger';

const middelwares = [logger];

const Store = createStore(rootReducer, applyMiddleware(...middelwares));

export default Store;