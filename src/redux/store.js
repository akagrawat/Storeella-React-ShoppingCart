import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { logger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { fetchCollectionsStart } from '../redux/shop/shop.sagas';

const sagaMiddleware = createSagaMiddleware();

const middelwares = [logger, sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middelwares));

sagaMiddleware.run(fetchCollectionsStart);

export const persistor = persistStore(store)

export default { store, persistor };