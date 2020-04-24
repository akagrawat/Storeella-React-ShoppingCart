import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { logger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middelwares = [logger, sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middelwares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)

export default { store, persistor };