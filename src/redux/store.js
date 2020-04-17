import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { logger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const middelwares = [thunk, logger];

export const store = createStore(rootReducer, applyMiddleware(...middelwares));

export const persistor = persistStore(store)

export default { store, persistor };